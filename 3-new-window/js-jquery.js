const $ = jQuery

/**
 * Po kliku na tlačítko s id=classic-window-open se pokusí otevřít systém novou stránku pomocí window.open() na novém tabu
 */
$('#classic-window-open').on('click', function () {
    window.open(remoteUrl, '_blank')
})

/**
 * Po kliku na tlačítko id=linked-window-open se vytvoří na stránce virtuální link, na který se provede automatický klik a
 * následně se virtuální link opět ze stránky odstraní
 *
 * Funkce simuluje kliknutí uživatelem na odkaz
 */
$('#linked-window-open').on('click', function () {
    $('body').append(`<a href="${remoteUrl}" target="_blank" rel="noopener noreferrer" class="virtual-link">xxx</a>`)

    const linkElement = $('.virtual-link')

    linkElement[0].click()
    linkElement.remove()
})

/**
 * Podobný případ, jako při běžném window.open(), ale s tím rozdílem, že:
 * - otevře se stránka na stejné URL adrese, takže nedochází ke křížení domén
 * - stránka na stejné URL adrese si provede redirect sama, čímž není potřebná uživatelova interakce
 * - výlsedná URL adresa je kódovaná pomocí base64 pro opravení problémových odkazů
 */
$('#redirected-window-open').on('click', function () {
    window.open(`redirect.html?link=${btoa(remoteUrl)}`, '_blank')
})

/**
 * Kombinace předchozích řešení
 * - vytvoří se virtální odkaz na stránce
 * - na odkaz se automatizovaně klikne
 * - otevře se stránka v novém tabu na stejné doméně
 * - virtuální odkaz se smaže
 * - výlsedná URL adresa je kódovaná pomocí base64 pro opravení problémových odkazů
 */
$('#redirected-linked-window-open').on('click', function () {
    $('body').append(`<a href="redirect.html?link=${btoa(remoteUrl)}" target="_blank" rel="noopener noreferrer" class="virtual-link">xxx</a>`)

    const linkElement = $('.virtual-link')

    linkElement[0].click()
    linkElement.remove()
})

/**
 * Provolání externí API pro získání URL adresy
 */
$('#async-window-open').on('click', function () {
    $.ajax({
        url: 'https://astrumq.com/url-demo-generator.php',
        success: function(result){
            // Vytvoří se virtuální link na stránce
            $('body').append(`<a href="redirect.html?link=${btoa(result.link)}" target="_blank" rel="noopener noreferrer" class="virtual-link">xxx</a>`)

            // Reference na vytvořený virtuální link
            const linkElement = $('.virtual-link')

            // setTimeout běží v hlavním vlákně aplikace, takže se obsah provede nezávisle na změněném kontextu
            // https://stackoverflow.com/a/70463940
            setTimeout(() => {
                linkElement[0].click()
                linkElement.remove()
            })
        },
    })
})
