//TUTORIAL ROBOFRIENDS STEP BY STEP

1.- crea tu entorno de trabajo
2.- Terminal create-react-app (nameOfYourApp) in my case: 'create-react-app robofriends'
3.- CD into your directory: 'cd robofriends' you must see node_modules etc
4.- Vemos un archivo package.json donde aparecen all our dependencies and we will see npm start that runs our server
5.- now, terminal: 'npm start'; //esto deberia de abrir nuestra app en el navegador en el localhost: 3000;
6.- Vamos a instalar un nuevo modulo: 'npm i tachyons@4.10.0'; //nos apoyara con stylos pero esta version se debera instalar
    Hay que importarlo (index.js) import 'tachyons';
7.- Vamos a borrar los archivos que no estaremos utilizando:
      Delete: -app.js
              -index.css
              -app.test
              -logo.svg

8.- Lets build the smaller component first, which is going to be the card component;
9.- (index.js) modificar el elemento que se va a renderizar e importarlo:

      import Card from './Card';

      ReactDOM.render(<Card />, document.getElementById('root'));
      registerServiceWorker();

10.- Crear new file : (src/Card.js)
11.- (src/Card.js) crear el elemento Card

      import React from 'react';

      const Card = () => {
        return (
          <div>
            <img src="" alt="photo" /> //es very important to close all etiquetas
            <div>
              <h2>Jane Doe</h2>
              <p>Joe.doe@gmail.com</p>
            </div>
          </div>
        );
      }

      export default Card;

12.-Para nuestra imagen vamos a utilizar API robohash que nos brinda un robot diferente.
    //despues de la direccion colocamos test y para que las imagenes tengan el mismo tamano colocamos ?200x200
    <img src="https://robohash.org/test?200x200" alt="photo" />

13.- lest add some styles on our card component;

    <div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>

14.- Se agregara una lista 'robots.js' que simulara json.
15.- Importa robots.js en el archivo index.js
    //cuando exportamos robots no lo hicimos con default ahora tenemos que usar destructuring para importarlo
    // si tuviesemos mas objetos de uso seria: { robots, cats }
      import { robots } from './robots';

16.- (Card.js) este elemento aceptara ahora props.

        const Card = (props) => { //aceptara como parametro props (propiedades)
          return (
            <div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
              <img src="https://robohash.org/test?200x200" alt="robots" />
              <div>
                <h2>{props.name}</h2> //es importante colocarlo en {} porque es JS expression
                <p>{props.email}</p>
              </div>
            </div>
          )
        }

17.- (index.js) Cuando renderizamos el elemento colocamos sus propiedades en este caso usaremos nuestro file robots

      ReactDOM.render(<Card id={robots[0].id} name={robots[0].name} email={robots[0].email}/>, document.getElementById('root'));
      registerServiceWorker();

18.- (Card.js)  Tambien queremos que nuestro id sea dinamico y cambie siempre, por lo que
                utilizaremos `` template strings y {} porque recuerda es JS expression.

            <img src={`https://robohash.org/${props.id}200x200`} alt="robots" />

19.- (Card.js) Si quieres limpiar tu codigo puedes utilizar destructuring like this:

            const Card = ({ name, id, email }) => {
              return (
                <div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
                  <img src={`https://robohash.org/${id}200x200`} alt="robots" />
                  <div>
                    <h2>{name}</h2>
                    <p>{email}</p>
                  </div>
                </div>
              )

20.- Lets create a CardList component donde pondremos a nuestro 10 usuarios ficticios que estan en el archivo robots.js
21.- (src/CardList) new file 'CardList';
22.- (index.js) Importar CardList component y renderizar el componente padre CardList;//Este sera nuestro padre component
      Aqui ya podremos quitar el import de Card.js porque no estara renderizado y no se utiliza en este archivo.

            import React from 'react';
            import ReactDOM from 'react-dom';
            import CardList from './CardList';
            import registerServiceWorker from './registerServiceWorker';

            ReactDOM.render(<CardList />, document.getElementById('root'));
            registerServiceWorker();

23.-(CardList.js) importaremos nuestros modulos o dependencies:

            import React from 'react';
            import Card from './Card';
            import { robots } from './robots';

            const CardList = () => {
              return(
                <div>
                  <Card id={robots[0].id} name={robots[0].name} email={robots[0].email}/>
                </div>
              )
            }

            export default CardList;

24.- Podemos hacer mas dinamica nuestra app, colocando el acceso a robots.js como props
25.- (index.js) colocar robots como props:

        import { robots } from './robots';

        ReactDOM.render(<CardList robots={robots} />, document.getElementById('root'));
        registerServiceWorker();

26.- (CardList.js) Actualizar este file

        const CardList = ({ robots }) => {
          return(
            <div>
              <Card id={robots[0].id} name={robots[0].name} email={robots[0].email}/>
            </div>
          )
        }

27.- Para visualizar los 10 usuarios que se encuentra en robots.js vamos a realizar un loop.
28.- (CardList.js) realizara loop con map para mostrar a todos los usuarios:

          const CardList = ({ robots }) => {
            const cardComponent = robots.map((robot, i) => {
              return <Card id={robots[i].id} name={robots[i].name} email={robots[i].email}/>
            })
            return(
              <div>
                {cardComponent} //hay que renderizar el componente creado previamente que guardo el loop hecho con map
              </div>
            )
          }

29.- Ahora la consola de nuestro navegador esta indicando el siguiente error:
        Warning: Each child in an array or iterator should have a unique "key" prop.

30.- (CardList.js) para eliminarlo utilizaremos key de la siguiente manera:

      return <Card key={i} id={...}

31.- (CardList.js) Si queremos limpiar nuevamente nuestro codigo:

      const CardList = ({ robots }) => {
        return(
          <div>
            { // <--- recuerda colocar el codigo JS dentro de {}
              robots.map((robot, i) => {
                return <Card key={i} id={robots[i].id} name={robots[i].name} email={robots[i].email}/>
              })
            }
          </div>
        )
      }

32.- Ahora vamos a crear App.js como el padre componente.
33.- (src) new file 'App.js'
34.- (index.js) renderiza a App component:

        ReactDOM.render(<App/>, document.getElementById('root'));
        registerServiceWorker();

35.-(App.js) import the dependencies, declare the constant with the title 'RoboFriends' on it and export it:

        import React from 'react';
        import CardList from './CardList';
        import { robots } from './robots';

        const App = () => {
          return(
            <div className='tc'> //centrara el element
              <h1>RoboFriends</h1>
              <SearchBox/>
              <CardList robots={robots} />
            </div>
          )
        }

        export default App;

36.- now, we also need a searchbox, let's create this component:
37.- (src) new file SearchBox;
38.- (SearchBox.js) import, export the dependencies and declare the element.

        import React from 'react';

        const SearchBox = () => {
          return(
            <div>
              <input type='seach' placeholder='Search Robots' />
            </div>
          )
        }
        export default SearchBox;

39.- (SearchBox.js) Agrega algunas clases para estilizar el elemento SearchBox:

        <div className='pa2'>
          <input className='pa3 ba b--green bg-lightest-blue'/>
        </div>

40.- Now, how to make this interactive? SearchBox need to comunicate with the CardList
41.- Time to use STATE, in order to use it we need to declare a Class.
    //STATE usually life in the parent component
42.- (App.js) vamos a declarar la clase en el componente padre:

          class App extends React.Component {
            constructor() { //Aqui en el metodo constructor declarar el state
              super()
              this.state = {
                robots: robots,
                searchField: ''
              }
          }
            render(){
              return(
                <div className='tc'>
                  <h1>RoboFriends</h1>
                  <SearchBox />
                  <CardList robots={this.state.robots} /> //ahora puedo accesar a robots desde state
                </div>
              )
            }
          }

43.- Vamos a crear una funcion llamada 'onSearchChange()';
    //here every time that the input changes we get an event, we need to console.log this event.

44.- Ahora puedo pasar esta funcion a mi elemento SearchBox;

45.- (App.js) solo hay que ponerle this primero porq esta dentro de un objeto clase

          <SearchBox searchChange={this.onSearchChange}/>

46.- (SearchBox.js) ahora puedo pasar como parametro la funcion que declare en el elemento padre:

          const SearchBox = ({ searchField, searchChange }) => {

47.- (SearchBox.js) colocar onChange en el input del elemento:

          <input type='seach' placeholder='Search Robots'
            className='pa3 ba b--green bg-lightest-blue'
            onChange={searchChange}
            />
          //si validamos en nuestro navegador podremos ver por consola el evento
48.- (App.js) ahora podemos cambiar lo que muestra la consola con event.target.value //Todos los eventos lo tienen

          onSearchChange(event){
            console.log(event.target.value);
          } //validalo en consola del navegador

49.- (App.js) Cambiaremos uno de los estados de nuestra app dentro de la funcion onSearchChange()
// setState se utiliza para cambiar el estado
onSearchChange(event){
  this.setState({ searchField: event.target.value})
  //filtraremos robots dentro de una constante
  const filteredRobots = this.state.robots.filter(robot => {
    return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
  })
  console.log(filteredRobots);
}

50.- Hay un error muy confuso en React:
    //aparece en la consola del navegador
      Cannot read property 'setState' of undefined
          at onSearchChange
    //Para eliminarlo hay que declarar todas las funciones que se declaren dentro del constructor
    //con arrow functions like this:

    onSearchChange = (event) => { ... }

51.- We have the fact that filter robots is still not assigned, and you're right.
    If we look at this, we've now communicated the search box with the app, and we have the search field constantly changing
    So now we need to communicate it to the "filteredRobots". What we can do is that "filteredRobots" can now
    be used as props instead of "this.state.robots"

52.- (App.js) pasamos filteredRobots en el componente CardList pero para accesar lo movemos :

      onSearchChange = (event) => {
        this.setState({searchField: event.target.value})
      }

      render(){
        const filteredRobots = this.state.robots.filter(robot => {
          return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
        })
        return(
          <div className='tc'>
            <h1>RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <CardList robots={filteredRobots} />
          </div>
        )
      }
      }

53.- Summary:
      // Let's go over it one more time to show you exactly what it does
      // We have our "App" component that has two states - "robots" and "searchfield"
      // And because "App" owns the state, any component that has "state" uses the "class" syntax so they can use the
      // "constructor" function to create "this.state", and this "state" is what changes in an app
      // It's what describes the app
      // Remember when I said the virtual DOM is just a javascript object? The virtual DOM is just an object that
      // collects this entire state and React uses this state to render and pass them down as props to these
      // components so that these components that are just pure functions can just render
      // And we always know that the app is going to look the same because, well, they're just simple pure functions
      // We manage this state in here, the app is the only thing that can change this state
      // But it can pass down things such as props, so we passed down "onSearchChange" to the "SearchBox", and the
      // "SearchBox", every time there's an "onChange" on the input,
      // it lets the app know "Hey, there was a change"
      // "Run this function
      // It runs the function with the event and updates the state of the "searchfield" to whatever we type
      // Now with the information that we have from the search box we can now communicate to the card list and
      // tell it "Hey, I want to filter the "robots" state to now have only what includes in the "searchfield"
      // and instead of passing that "this.state" to our "robots" we just passed the "filteredRobots".

54.-  (index.css) new file index.css vamos a Styling Your React App.

        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
          background: linear-gradient(to left, rgba(7,27,82,1) 0%, rgba(0,128,128,1) 100%)
        }

55.- Importar index.css en index.js:

        import './index.css';

56.- Vamos a descargar un estilo de letra como la de SEGA desde:
      https://www.cufonfonts.com/font/sega-logo-font
      descargar el Zip por 'Download @font-face Web Font'

57.- new file App.css
58.- (App.css) agrega el nuevo tipo de letra:

      /* #### Generated By: http://www.cufonfonts.com #### */

      @font-face {
      font-family: 'SEGA LOGO FONT';
      font-style: normal;
      font-weight: normal;
      src: local('SEGA LOGO FONT'), url('SEGA.woff') format('woff');
      }

      h1 {
        font-family: 'SEGA LOGO FONT';
        font-weight: 200;
        color: #0CCaC4;
      }

59.- Ahora tenemos que colocar el font dentro de nuestro proyecto.
    copia el archivo SEGA.woff y colocalo dentro de src

60.- (App.js) Importar el css

      import './App.css';


61.- (App.js) Now, in real life when we start up this app this robbots would be an empty array
            //la clase debera de tener inicialmente un array vacio porque aun no hemos tomado a los usuarios
            class App extends React.Component {
              constructor() {
                super()
                this.state = {
                  robots: [], //  <--- empty ARRAY
                  searchField: ''
                }
              }

62.- LIFECYCLE HOOKS components:
//I am saying run the constructor with an empty array just to show you the order of execution here.

      componentDidMount(){
        this.setState({robots}) //Ahora cambia el estado a robots
      }

63.- Ahora que vemos que funciona vamos a remover el archivo robots.json y llamar la APi
64.- Vamos a realizar nuestra app  mas realistic and vamos a usar API
65.- Visita https://jsonplaceholder.typicode.com/
66.- Iremos al apartado de usuarios (users) https://jsonplaceholder.typicode.com/users
67.- (App.js) actualizar el metodo componentDidMount():

            componentDidMount(){
              fetch('https://jsonplaceholder.typicode.com/users').then(response => {
                return response.json();
              })
              .then(users => {
                this.setState({robots: users})
              })
            }

68.- En el caso de que tu API contenga miles de usuarios (esto puede tardar) por ello se lo indicamos al usuario
    con un 'LOADING'

                render(){
                  const filteredRobots = this.state.robots.filter(robot => {
                    return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
                  })
                  if(this.state.robots.length === 0) {
                    return <h1> Loading </h1>
                  } else {
                    return(
                      <div className='tc'>
                        <h1 className='f1'>RoboFriends</h1>
                        <SearchBox searchChange={this.onSearchChange}/>
                        <CardList robots={filteredRobots} />
                      </div>
                    )
                  }
                }
                }

69.- Nuestra app luce really nice! but now I can see that when I scroll down I loose my searchbox
    para tenerla siempre a la vista podemos crear un nuevo elemento

70.- Create a new file: 'Scroll.js'
71.-(App.js) Importa el nuevo componente y renderizalo :

          import Scroll from './Scroll';

          return(
            <div className='tc'>
              <h1 className='f1'>RoboFriends</h1>
              <SearchBox searchChange={this.onSearchChange}/>
                <Scroll> //solo envolvera el elemento CardList
                  <CardList robots={filteredRobots} />
                </Scroll>
            </div>
          )

72.-(Scroll.js) No retornara nada solo envolvera otro elemento:

          import React from 'react';

          const Scroll = (props) =>{
            return props.children
          }// para ello utilizamos children
          //Using props.children we can create Components that wrap other Components
          // const Scroll = (props) => {
              // console.log(props)} esto es solo para ver que aparece en la consola
          export default Scroll;

73.- (Scroll.js) Ahora que usamos props.children podemos hacer Scroller colocandolo dentro de elemento <div>

          const Scroll = (props) =>{
            return (
              <div>
                {props.children}
              </div>
            )
          }

74.- (Scroll.js) Colocarle Stylos.css (esto lo podemos hacer con un archivo scroll.css o directamente):

        <div style={{ overflowY: 'scroll', border: '1px solid black', height: '500px'}}>
          {props.children}
        </div>

75.- This a simple app page:
      - it allows you to search.
      - It allows you to scroll
but it does show the power of React, doesn't it?

76.- So let's clean up this code.
      folder structure is one of the most important things.

77.- Create new Folder: 'components';
78.- Create new Folder: 'containers';

79.-  Mover los elementos a donde pertenezcan:
      Pure functions are going to be on components folder
        components: Card, CardList, Scroll, SearchBox

        containers: App.js, App.Css y SEGA.WOFF (porque este archivo lo contiene app)

80.- (App.js) Modificar los imports:
        //SALTE UN directory BECAUSE APP.JS ESTA DENTRO DE containers
        import React from 'react';
        import CardList from '../components/CardList'; //salte un directory y busca components
        import Scroll from '../components/Scroll';
        import SearchBox from '../components/SearchBox';
        import './App.css';

81.- (index.js) vamos a modificar el import de App:

        import App from './containers/App';

82.- SI DESEAS LIMPIAR MAS TU CODIGO:
  https://www.udemy.com/the-complete-web-developer-in-2018/learn/v4/t/lecture/8757626?start=0
  https://github.com/aneagoie/robofriends
