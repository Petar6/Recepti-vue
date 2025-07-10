Recepti Vue Aplikacija

Ova aplikacija omogućuje pretraživanje recepata prema nazivu koristeći [TheMealDB API](https://www.themealdb.com/), te prikaz detalja odabranog recepta na zasebnoj stranici, uključujući sliku i YouTube video ako su dostupni.

---

Kako pokrenuti aplikaciju

1. Kloniraj repozitorij:

git clone https://github.com/Petar6/Recepti-vue.git

Uđi u projektni direktorij:

cd Recepti-vue

Instaliraj ovisnosti:

npm install

Pokreni razvojni server:

npm run dev

Otvori u pregledniku:

http://localhost:5173

Korištene tehnologije
Vue 3

TypeScript

Vite – alat za buildanje i lokalni server

Vue Router

Fetch API

TheMealDB API

(Opcionalno) Sass za stilove

Dohvaćanje podataka s API-ja

Podaci se dohvaćaju pomoću fetch() funkcije iz TheMealDB API-ja:

https://www.themealdb.com/api/json/v1/1/search.php?s=NAZIV – pretraga recepata

https://www.themealdb.com/api/json/v1/1/lookup.php?i=ID – detalji recepta

Funkcionalnosti

Pretraživanje recepata po nazivu

Prikaz liste rezultata (slika + naziv)

Klikom na recept otvaraju se detalji recepta na drugoj ruti

Detaljan prikaz uključuje:

Naziv

Upute za pripremu

Slika recepta

Ugrađeni YouTube video (ako postoji)

Problemi i rješenja

Problem: Neki recepti nemaju YouTube video, što je uzrokovalo grešku u prikazu.

Rješenje: Dodana je provjera if (meal.strYoutube) prije prikaza iframea.

Problem: API vraća null ako ne postoji recept s tim nazivom.

Rješenje: Dodano rukovanje null vrijednostima – prikazuje se poruka "Nema rezultata".

Problem: Razlike između LF/CRLF linijskih završetaka (na Windowsima).

Rješenje: Ignorirano jer ne utječe na funkcionalnost.


API
Podaci dolaze s: https://www.themealdb.com

Autor

Petar
GitHub: @Petar6