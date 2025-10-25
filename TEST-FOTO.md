# 🎮 Test Foto Personaggi - JUVLAN Fase 2

## ✅ Foto Integrate

Le foto dei personaggi sono state integrate nel gioco Bomberman (Fase 2).

**Personaggi con foto:**
- 😎 Dionis (player)
- 👤 Denis
- 👤 Leo  
- 👤 Roland
- 👤 Vida
- 👤 Sem
- 👤 Briks

## 🧪 Come Testare

### 1. Apri il Gioco
```
Apri index.html nel browser
```

### 2. Completa la Fase 1
- Rispondi alle 10 domande del quiz
- Ottieni almeno 5/10 risposte corrette
- Passerai automaticamente alla Fase 2

### 3. Verifica le Foto
Nella Fase 2 (Bomberman) dovresti vedere:
- **Foto circolari** al posto degli emoji
- **Bordo azzurro** per Dionis (player)
- **Bordo rosso** per i nemici (Juvlanisti)
- Le foto si adattano alle celle del gioco

### 4. Controlla la Console
Apri DevTools (F12) → Console e verifica:
```
✅ Immagine caricata: Dionis
✅ Immagine caricata: Denis
✅ Immagine caricata: Leo
✅ Immagine caricata: Roland
✅ Immagine caricata: Vida
✅ Immagine caricata: Sem
✅ Immagine caricata: Briks
🎉 Tutte le immagini caricate!
```

## 🐛 Troubleshooting

### Le foto non appaiono
**Problema:** Vedi emoji invece delle foto
**Soluzione:**
1. Verifica che i file siano in `foto/` con i nomi corretti:
   - Dionis.jpg
   - Denis.jpg
   - Leo.JPG
   - Roland.JPG
   - Vida.jpg
   - Sem.jpg
   - Briks.JPG

2. Controlla la console per errori di caricamento

3. Prova a ricaricare la pagina (Ctrl + F5)

### Foto distorte o tagliate
**Problema:** Le foto non sono quadrate
**Soluzione:** Il gioco le ritaglia automaticamente in cerchi, ma funziona meglio con foto quadrate o ritratti centrati

### Foto troppo grandi/piccole
**Problema:** Le foto occupano troppo spazio
**Soluzione:** Le foto vengono ridimensionate automaticamente a 40x40px (dimensione cella)

## 📸 Formato Foto Consigliato

Per risultati ottimali:
- **Formato:** JPG o PNG
- **Dimensioni:** Minimo 100x100px (vengono ridimensionate)
- **Tipo:** Ritratto frontale, viso centrato
- **Sfondo:** Qualsiasi (viene ritagliato in cerchio)

## 🎨 Personalizzazione

Se vuoi cambiare le foto:
1. Sostituisci i file nella cartella `foto/`
2. Mantieni gli stessi nomi
3. Ricarica il gioco

## ✨ Funzionalità

- **Rendering circolare:** Le foto vengono ritagliate in cerchi perfetti
- **Bordi colorati:** Azzurro per Dionis, rosso per nemici
- **Fallback emoji:** Se una foto non carica, usa emoji
- **Performance:** Le foto vengono caricate una volta all'inizio

## 🚀 Prossimi Passi

Dopo aver verificato che le foto funzionano:
1. Testa il gioco completo
2. Verifica che le foto appaiano in tutti i 5 livelli
3. Se tutto ok, puoi fare il deploy su GitHub!
