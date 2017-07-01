module CaesarCipher
(encode
, decode
) where

import Data.Char (chr, ord)


encode :: Int -> [Char] -> [Char]
encode offset message = map (chr . (+ offset) . ord) message


decode :: Int -> [Char] -> [Char]
decode offset message = encode (negate offset) message
