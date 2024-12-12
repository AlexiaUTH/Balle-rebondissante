/* ON VEUT CREER UNE BALLE 
        
    -> Elle aura un certain diamètre
    -> Se déplace
        - A une position dans la fenêtre (coordonnées X et Y)
        - A une vitesse de déplacement
    -> Rebondi sur les bords de la fenêtre
        - Change de direction(s)
       
*/

function creer_balle(){

    /*PREPARATION D'UNE NOUVELLE DIV*/
    let nouvelle_balle = document.createElement("div");
    
    /*INSERTION DE CETTE NOUVELLE DIV DANS <BODY>*/
    document.body.append(nouvelle_balle);  // Le 'document.body' est la même chose que 'document.queryselector("body")'
    
    /*DONNER A LA BALLE (NOTRE DIV) UN ASPECT VISUEL DE BASE*/
    
    // Le diamètre sera utilisé pour donner à la fois une hauteur et une largeur à la div représentant notre balle. On peut préparer cette valeur sous forme d'une variable.
    
    // Le diamètre n'est plus juste une variable, c'est une propriété qu'on donne à 'nouvelle_balle; cela représente une de ses caractérisques.
    // Techniquement, ça reste une variable qui "appartient" à l'objet nouvelle_balle, et qui y est également "rangée".
    
    nouvelle_balle.diametre = 75;

    nouvelle_balle.className = "balle";
    nouvelle_balle.style.width = nouvelle_balle.diametre + "px";
    nouvelle_balle.style.height = nouvelle_balle.diametre + "px";
    
    /*PERMETTRE A LA BALLE DE SE DEPLACER*/
    // On va pour cela simuler le passer du temps, la balle devra changer d'enplacement d'un instant au suivant
    // -> On mettra en place un cycle : toutes les N millisecondes, les coordonnées de la balle devront évoluer.
    
    nouvelle_balle.vitesse = 5; // pixels par cycle
    nouvelle_balle.coordonnee_X = Math.random() * window.innerWidth;
    nouvelle_balle.coordonnee_Y = Math.random() * window.innerHeight;
    nouvelle_balle.direction_X = 1; // doit devenir -1 pour aller vers la gauche
    nouvelle_balle.direction_Y = 1; // doit devenir -1 pour aller vers le haut

    // On veut pouvoir manipuler la nouvelle bale une fois créée, il faut donc que cette fonction creer_balle() la renvoie.

    nouvelle_balle.deplacement = deplacement(nouvelle_balle);

    // Ajout d'une méthode déplacement() à la balle
    nouvelle_balle.deplacement = function() {
        // Puisqu'on avait commencé par créer une fonction deplacement(balle), on peut techniquement l'utiliser telle quelle. Rien n'empêche d'avoir à la fois une fonction globale et une méthode d'un objet qui portent le même nom : ce sont deux données différentes.
        deplacement(this);
    }
    return nouvelle_balle;
}

function test_collisions(balle_a_tester) {

    if (balle_a_tester.coordonnee_X < 0 || balle_a_tester.coordonnee_X >= window.innerWidth - balle_a_tester.diametre) { // || signifie "ou"
        balle_a_tester.direction_X *= -1;
    }

    if (balle_a_tester.coordonnee_Y < 0 || balle_a_tester.coordonnee_Y >= window.innerHeight - balle_a_tester.diametre) { // || signifie "ou"
        balle_a_tester.direction_Y *= -1;
    }
}

function deplacement(balle_a_deplacer) {

    test_collisions(balle_a_deplacer);

    balle_a_deplacer.coordonnee_X += balle_a_deplacer.vitesse*balle_a_deplacer.direction_X;
    balle_a_deplacer.coordonnee_Y += balle_a_deplacer.vitesse*balle_a_deplacer.direction_Y;

    balle_a_deplacer.style.left = balle_a_deplacer.coordonnee_X + "px";
    balle_a_deplacer.style.top = balle_a_deplacer.coordonnee_Y + "px";

}

/*let balle1 = creer_balle();
let balle2 = creer_balle();
let balle3 = creer_balle();
*/

let les_balles = new Array();

for (let i = 0 ; i < 50 ; i++ ) { // Création d'un compteur

    les_balles.push( creer_balle() );
    // ou : les_balles[i] = creer_balle();

}

setInterval(function(){ //c'est pour que la balle a un mouvement fluide//

    /*for (let i = 0 ; i <= les_balles.length ; i++ ) { // Création d'un compteur

        les_balles[i].deplacement();
        // ou : les_balles[i] = creer_balle();
    
    }*/

    for (let la_balle of les_balles) {
        la_balle.deplacement();
    }


    // - soit la balle se trouve à left:0, soit elle se trouve à left: largeur de fenêtre moins largeur de balle
    
    // Faire changer les coordonnées en fonction de la vitesse, et les appliquer à la div représentant la balle :
    /*balle1.deplacement (balle1);
    balle2.deplacement (balle2);
    balle3.deplacement (balle3);*/

}, 40); // 40 = 1000 / 25, le cycle s'exécutera à une fréquence de 25 fois par seconde