const express = require("express");
const path    = require("path");

const app        = express();
const LOCAL_PORT = 9000;

const datas = [
    {id: 1, title: "Article 1", content: "Contenu de l'article 1", longContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ullam, a error, laudantium natus rem sapiente hic, accusamus assumenda sunt maiores tempora in suscipit dignissimos itaque! Iusto, amet. Dolorum voluptatem modi neque ipsa dolore, adipisci doloremque odit magnam perspiciatis repudiandae blanditiis nemo expedita soluta voluptatum rem deleniti consequatur eaque in. Accusantium ipsa nesciunt mollitia ex a.", author: "Jano", date: "2021-09-01"},
    {id: 2, title: "Article 2", content: "Contenu de l'article 2",longContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ullam, a error, laudantium natus rem sapiente hic, accusamus assumenda sunt maiores tempora in suscipit dignissimos itaque! Iusto, amet. Dolorum voluptatem modi neque ipsa dolore, adipisci doloremque odit magnam perspiciatis repudiandae blanditiis nemo expedita soluta voluptatum rem deleniti consequatur eaque in. Accusantium ipsa nesciunt mollitia ex a.", author: "Bill", date: "2021-09-02"},
    {id: 3, title: "Article 3", content: "Contenu de l'article 3",longContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ullam, a error, laudantium natus rem sapiente hic, accusamus assumenda sunt maiores tempora in suscipit dignissimos itaque! Iusto, amet. Dolorum voluptatem modi neque ipsa dolore, adipisci doloremque odit magnam perspiciatis repudiandae blanditiis nemo expedita soluta voluptatum rem deleniti consequatur eaque in. Accusantium ipsa nesciunt mollitia ex a.", author: "Sandrine", date: "2021-09-03"},
    {id: 4, title: "Article 4", content: "Contenu de l'article 4",longContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ullam, a error, laudantium natus rem sapiente hic, accusamus assumenda sunt maiores tempora in suscipit dignissimos itaque! Iusto, amet. Dolorum voluptatem modi neque ipsa dolore, adipisci doloremque odit magnam perspiciatis repudiandae blanditiis nemo expedita soluta voluptatum rem deleniti consequatur eaque in. Accusantium ipsa nesciunt mollitia ex a.", author: "Jean", date: "2021-09-04"},
]

// configurer:
// - la configuration du moteur de rendu
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// - l'accès aux fichier static
app.use(express.static(path.join(__dirname, "../public")));
// - le parsing des formulaires
app.use(express.urlencoded({extended: false}));


// app.use((req,res, next) => {

//     console.log("method -->", req.method);
//     console.log("url -->", req.url);
//     console.log("params -->", req.params);
//     next();
// });

app.get("/", (req, res) => {
    res.render("home", {datas});
});

app.get("/article/:id", (req,res) => {
    const id   = Number(req.params.id);
    const data = datas.find((data) => data.id === id);
    console.log(data); // permets de vérifier si on a l'élément ou pas et donc undefined
    if(!data){ // data === falsy/false
        res.status(404).render("not-found");
        return;
    }
    res.render("article", {data});
});

app.get("*", (req, res) => {
    res.status(404).render("not-found");
});

app.listen(LOCAL_PORT, () => console.log(`http://localhost:${LOCAL_PORT}`));