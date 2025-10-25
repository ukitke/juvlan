# JUVLAN App Icons

## Generazione Icone

Per generare le icone PWA nelle dimensioni corrette, puoi usare uno di questi metodi:

### Metodo 1: Online (Più Facile)
1. Vai su https://realfavicongenerator.net/ o https://www.pwabuilder.com/imageGenerator
2. Carica `icon-template.svg` o crea un'icona personalizzata
3. Scarica tutte le dimensioni generate
4. Sostituisci i file in questa cartella

### Metodo 2: ImageMagick (Command Line)
Se hai ImageMagick installato:

```bash
# Converti SVG in PNG di diverse dimensioni
magick icon-template.svg -resize 72x72 icon-72x72.png
magick icon-template.svg -resize 96x96 icon-96x96.png
magick icon-template.svg -resize 128x128 icon-128x128.png
magick icon-template.svg -resize 144x144 icon-144x144.png
magick icon-template.svg -resize 152x152 icon-152x152.png
magick icon-template.svg -resize 192x192 icon-192x192.png
magick icon-template.svg -resize 384x384 icon-384x384.png
magick icon-template.svg -resize 512x512 icon-512x512.png

# Icone aggiuntive
magick icon-template.svg -resize 16x16 icon-16x16.png
magick icon-template.svg -resize 32x32 icon-32x32.png
magick icon-template.svg -resize 180x180 icon-180x180.png
```

### Metodo 3: Photoshop/GIMP
1. Apri `icon-template.svg` in Photoshop o GIMP
2. Esporta nelle seguenti dimensioni:
   - 16x16, 32x32 (favicon)
   - 72x72, 96x96, 128x128, 144x144, 152x152 (Android)
   - 180x180 (iOS)
   - 192x192, 384x384, 512x512 (PWA standard)

## Dimensioni Richieste

- **16x16, 32x32**: Favicon browser
- **72x72, 96x96, 128x128, 144x144, 152x152**: Android home screen
- **180x180**: iOS home screen
- **192x192**: Android splash screen
- **384x384, 512x512**: PWA splash screen e app drawer

## Design Guidelines

- Usa colori ad alto contrasto
- Mantieni il design semplice e riconoscibile
- Testa su sfondo chiaro e scuro
- Assicurati che il testo sia leggibile anche nelle dimensioni più piccole
