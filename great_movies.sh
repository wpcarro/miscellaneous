#!/usr/bin/env bash


function check_brew {
  echo "Checking for brew..."
  command -v brew >/dev/null 2>&1 || {
    echo >&2 "brew is not installed on your system and is a requirement if you want to install pup."
    echo >&2 " --- brew install --- "
    echo >&2 "Run the following command to install brew:"
    echo >&2 '/usr/bin/ruby -e "$(curl-fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"'
    echo >&2 " -------------------- "
    return 0
  }
  echo "brew installed!"
  return 1
}


# Checks if `pup` is installed.
command -v pup >/dev/null 2>&1 || {
  echo >&2 "This application requires pup to run."
  check_brew
  echo >&2 "pup is not installed on your system."
  echo >&2 " --- pup install --- "
  echo >&2 'brew install https://raw.githubusercontent.com/EricChiang/pup/master/pup.rb'
  echo >&2 " -------------------- "
  echo >&2 "Aborting."
  exit 1
}


domain="www.imdb.com"
url="${domain}/chart/top"
html_filename="great_movies.html"
titles_filename="great_movies_titles.txt"
ratings_filename="great_movies_ratings.txt"
links_filename="great_movies_links.txt"
random=0


if [ -z "$1" ]; then
  random=0
elif [ "$1" = "--random" ] || [ "$1" = '-R' ]; then
  random=1
fi

# Checks if the html has already been downloaded.
# TODO: check the timestamp of the download to ensure it's current (i.e. same day).
if [ -f "/tmp/${html_filename}" ]; then
  :
else
  curl $url >"/tmp/${html_filename}"
fi

# Gets movie titles.
pup <"/tmp/${html_filename}" '.lister-list .titleColumn a text{}' >"/tmp/${titles_filename}"

# Gets movie ratings.
pup <"/tmp/${html_filename}" '.lister-list .ratingColumn strong text{}' >"/tmp/${ratings_filename}"

# Gets movie URLs.
pup <"/tmp/${html_filename}" '.lister-list .titleColumn a attr{href}' >"/tmp/${links_filename}"

# Combine the lists.
if [ "$random" -eq 1 ]; then
  paste "/tmp/${titles_filename}" "/tmp/${ratings_filename}" | gsort -R | head -1
else
  paste "/tmp/${titles_filename}" "/tmp/${ratings_filename}"
fi


# Cleans `/tmp` files.
rm "/tmp/$titles_filename" "/tmp/$ratings_filename" "/tmp/$links_filename"

# TODO: delete the HTML file at the end of each day.
