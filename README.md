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
  status:"ok" : si success ; "ko": si erreur ,
  data : []
  message : "Message Success" si success ; "Message erreur " si erreur  // zay mahafalyfaly an lah lesy le message eto fa iny no afficher ko eo am popup 
}
```


