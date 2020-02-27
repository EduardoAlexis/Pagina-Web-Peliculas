(async function load() {
  // await
  // action
  // terror
  // animation
  // Funcion dinamica para la url de la api 
  async function getData(url) {
    // Una función asíncrona va a ser como una función normal, pero poniendo código asíncrono de forma que sea más fácil de leer de forma síncrona.
    //Para declarar una función asíncrona se usa la palabra reservada async, luego de eso declaras tu función de forma normal
    const response = await fetch(url);
    const data = await response.json()
    return data;
  }

  // try | es lo que hace cuando la operacion se completa satisfactoriamente
  try{


    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const overlay = document.getElementById('overlay')
    const overbuton = document.getElementById('overbuton')
    const form = document.getElementById('form')
    const salirbuton = document.getElementById('salir')
    const featuring = document.getElementById('featuring')
    const contenido = document.getElementById('contenido')
    const ImagenPeli = document.getElementById('primaryPlaylistItem')
    
    const Base_Api = 'https://yts.mx/api/v2/'
    // remove hace que se que quite la clase active                                               --------------------------------CERRAR OVERLAY
    overbuton.addEventListener('click', (event) => {
        overlay.classList.remove('active')
    })
    /* ImagenPeli.addEventListener('click', (event) => {
      overlay.classList.add('active')
    }) */
    salirbuton.addEventListener('click', (event) => {
        alert('Esta seguro que desea cerrar esta ventana')
    })
    // add anade la clase active
    overlay.addEventListener('click', (event) => {
        overlay.classList.remove('active')
    })
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    //                                                                                          ------------------------------- TEMPLATE BUSQUEDA
    function featureTemplate(movie) {
      return (
        `
    <div class="featuring">
      <dif class="faturing-image">
        <img = src="${movie.medium_cover_image}" width="70px" height="100" alt="">
      </div>
    <div class="featuring-content">
      <p class="featuring-title">Pelicula encontrada</p>
      <p class="featuring-album">${movie.title}</p>
      <p class="featuring-title">Description : ${movie.description_full}</p>
    </div>
      `);
    }
    
    // preventDefault hace que al buscar algo en el form no se recargue la pagina                 -------------------------------FORM
    form.addEventListener('submit', async(event) =>{
      try{
        event.preventDefault()
        contenido.classList.add('buscar')
        featuring.classList.remove('desactive')
        const data = new FormData(form);
        const peli = await getData( `${Base_Api}list_movies.json?limit=1&query_term=${data.get('name')}`)
        const Htmlstring = featureTemplate(peli.data.movies[0]);
        featuring.innerHTML = Htmlstring;
      }
        catch{
          alert('No se encontro lo que buscabas')
        }
    
    })

    //                                                                                       -------------------------------ABRIR IMAGEN
    function AbrirInfoPeli(element) {
      element.addEventListener('click',() => {
        overlay.classList.add('active')
      })
    }
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // obtener elemento por id                                                                         -------------------------------DECLARACIONES
    const $titulomodal = document.querySelector('#h1');
    const $imagenmodal = document.querySelector('#img');
    const $descripcionmodal = document.querySelector('#p');



    const $actionContainer = document.querySelector('#action');
    const $dramaContainer = document.querySelector('#drama');
    const $animationContainer = document.querySelector('#animation');
    const $infoContainer = document.querySelector('#info');


    // lista de peliculas de la api
    // la palabra reservada llamada await, lo que hará esta palabra es indicar que se debe esperar a que termine de ejecutarse ese fragmento de código antes de continuar.
    const actionList = await getData(`${Base_Api}list_movies.json?genre=action`)
    const dramaList = await getData(`${Base_Api}list_movies.json?genre=romance`)
    const animationList = await getData(`${Base_Api}list_movies.json?genre=animation`)
    
    console.log('actionList',actionList ,  animationList , dramaList)
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  
    // escribe codigo html en java y lo representa en el navegador                                    -------------------------------FUNCIONES DINAMICAS / TEMPLATE
    function videoItemTemplate(movie) {
      return (
        `<div class="primaryPlaylistItem" id="primaryPlaylistItem" data-id="${movie.id}">
        <div class="primaryPlaylistItem-image">
        <img src="${movie.medium_cover_image}" >
        </div>
        <h4 class="primaryPlaylistItem-title">
        ${movie.title}
        </h4>
        </div>`
        )
    }
    
    // Para convertir nuestra plantilla de texto a un Document Object Model necesitamos crear dentro de memoria un documento HTML, 
    //esto es posible gracias al método document.implementation.createHTMLDocument. A este documento HTML le vamos a añadir al body, mediante innerHTML, 
    //nuestra plantilla de texto. Una vez añadida le pedimos al body el primer elemento hijo que tenga y este lo añadimos a nuestro container.


    //                                                                                                ------------------------------- CREAR TEMPLATE DE HTML EN JS
    function createmplate(HTMLString) {
      const html = document.implementation.createHTMLDocument();
      html.body.innerHTML = HTMLString;
      return html.body.children[0];
    }

    // lista de peliculas - (container)= encontrar elemento por id                                    ------------------------------- RENDERIZAR TEMPLATE
    function rendermovielist(list , container) { 
      container.children[0].remove(); //remover gif (cargando)
      list.forEach((movie) => {

        const HTMLString = videoItemTemplate(movie);
        const movieElement = createmplate(HTMLString);
        container.append(movieElement)
        AbrirInfoPeli(movieElement)

      })
    }
    // rendermovielist toma 2 parametros ( ruta de la lista del api , id del elemento )
    rendermovielist(actionList.data.movies, $actionContainer)
    rendermovielist(animationList.data.movies, $animationContainer)
    rendermovielist(dramaList.data.movies, $dramaContainer)
    // console.log(videoItemTemplate('src/images/covers/bitcoinjpg', 'bitcoin'));


    $titulomodal.textContent = data.title;
    $imagenmodal.setAttribute('src', data.medium_cover_image);
    $descripcionmodal.textContent = data.description_full;



    console.log('Todo Correcto')

  }
  // catch se usa para notificar que hubo un error y el try no se ejecuto
  catch{
    console.log('Algo Salio Mal')
  }




})()


