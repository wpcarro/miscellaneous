// Uses an HTML scraper to pull github usernames from a
// github.com group. It uses Node's child processes as
// an escape hatch to run bash commands.

const fs = require('fs');
const x = require('x-ray')();
const { execSync } = require('child_process');

var html = fs.readFileSync('./mks26.html');

x(html, 'span.team-member-username', [{
  username: 'a',
}])((err, obj) => {
  obj.map(function(user) {
    return user.username.trim();
  })
  .forEach(username => {
    console.log(`username: ${username}`);
    execSync(`echo ${username} >> ./git-usernames.txt`);
  });
});
