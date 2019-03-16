import $ from 'jquery'
import CryptoJS from 'crypto-js'

const PUBLIC_KEY = '6bfcae28b3b2512d99a211c78de24433'
const PRIV_KEY = 'b520e8fd299b17fd2b6d69dd642c3c19a769913c'

function getHero (heroName) {
  let ts = new Date().getTime()
  let hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString()
  const urlHero = 'https://gateway.marvel.com:443/v1/public/characters'
  return (
    $.getJSON(urlHero, {
      ts: ts,
      apikey: PUBLIC_KEY,
      hash: hash,
      name: heroName
    })
  )
}

function getComic (urlComics) {
  let ts = new Date().getTime()
  let hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString()
  return (
    $.getJSON(urlComics, {
      ts: ts,
      apikey: PUBLIC_KEY,
      hash: hash
    })
  )
}

export default {
  getHero,
  getComic
}
