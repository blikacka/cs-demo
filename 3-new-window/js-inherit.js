/**
 * Funkce se snaží provolat klasický window.open() na nové záložce
 */
function windowOpenClassic() {
    window.open(remoteUrl, '_blank')
}

/**
 * Funkce vytvoří na stránce virtuální link, na který se provede automatický klik a následně se virtuální link opět ze stránky odstraní
 * Funkce simuluje kliknutí uživatelem na odkaz
 */
function linkedOpenLink() {
    const link = document.createElement('a')
    link.href = remoteUrl
    link.setAttribute('target', '_blank')
    link.setAttribute('class', 'virtual-link')
    document.body.appendChild(link)
    link.click()

    document.querySelectorAll('.virtual-link').forEach(el => el.remove())
}

/**
 * Podobný případ, jako při běžném window.open(), ale s tím rozdílem, že:
 * - otevře se stránka na stejné URL adrese, takže nedochází ke křížení domén
 * - stránka na stejné URL adrese si provede redirect sama, čímž není potřebná uživatelova interakce
 * - výlsedná URL adresa je kódovaná pomocí base64 pro opravení problémových odkazů
 */
function windowOpenRedirect() {
    window.open(`redirect.html?link=${btoa(remoteUrl)}`, '_blank')
}

/**
 * Kombinace předchozích řešení
 * - vytvoří se virtální odkaz na stránce
 * - na odkaz se automatizovaně klikne
 * - otevře se stránka v novém tabu na stejné doméně
 * - virtuální odkaz se smaže
 * - výlsedná URL adresa je kódovaná pomocí base64 pro opravení problémových odkazů
 */
function redirectedLinkedOpenLink() {
    const link = document.createElement('a')
    link.href = `redirect.html?link=${btoa(remoteUrl)}`
    link.setAttribute('target', '_blank')
    link.setAttribute('class', 'virtual-link')
    document.body.appendChild(link)
    link.click()

    document.querySelectorAll('.virtual-link').forEach(el => el.remove())
}

/**
 * Provolání externí API pro získání URL adresy
 */
function asyncLink() {
    const request = new XMLHttpRequest()

    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const link = document.createElement('a')
            link.href = `redirect.html?link=${btoa(JSON.parse(this.responseText).link)}`
            link.setAttribute('target', '_blank')
            link.setAttribute('class', 'virtual-link')
            document.body.appendChild(link)
            link.click()

            document.querySelectorAll('.virtual-link').forEach(el => el.remove())
        }
    }

    request.open('GET', 'https://astrumq.com/url-demo-generator.php')
    request.send()
}
