# M1 web avancer Binome Etu 884 - Etu 919
###### Depot voiture:
```bash
url-front: domain-front/depot-voiture
```

input data post:
```json
  {
    "marque_voiture": "Mercedes-benz",
    "model_voiture": "Sprinter 312",
    "date_deposition": "2022-01-10",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD ....."
  }
  ```
résultat attendu: 

```json
{
  "status":"ok", // "ok" si success "ko" sy erreur
  "data" : [],
  "message" : ""  //zay mety amna fa mfanaraka am ilay status (erreur ou success); iny no afficherko am popup 
}
```



