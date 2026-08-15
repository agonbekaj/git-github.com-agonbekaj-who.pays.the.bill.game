import React,{ Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import translations from '../languages.json';

const MyContext = React.createContext();

class MyProvider extends Component {
    state={
        stage:1,
        players:[],
        result:'',
        language: localStorage.getItem('language') || 'en',
        history: JSON.parse(localStorage.getItem('playerHistory')) || []
    }


    addPlayerHandler = (name) =>{
        if(!name.trim()) return;
        
        this.setState((prevState)=>({
            players:[
                ...prevState.players,
                name
            ]
        }))

        // Add to history
        const updatedHistory = [name, ...this.state.history.filter(h => h !== name)].slice(0, 20);
        this.setState({ history: updatedHistory });
        localStorage.setItem('playerHistory', JSON.stringify(updatedHistory));
    }

    removePlayerHandler = (idx) =>{
        let newArray = this.state.players;
        newArray.splice(idx,1)
        this.setState({players:newArray});

    }

    nextHandler = () => {
        
         const { players } = this.state
        if(players.length <2 ) {
            toast.error("You need more than one player",{
                position:toast.POSITION.TOP_LEFT,
                autoClose: 2000
            })

         } else {
            this.setState({
                stage:2
            },()=>{
                setTimeout(()=>{
                    this.generateLooser()
                },2000)
            })
        }
    }

    generateLooser = () => {
        const { players } = this.state;
        this.setState({
            result: players[Math.floor(Math.random() * players.length)]
        })
    }

    resetGame = () => {
        this.setState({
            stage:1,
            players:[],
            result:''
        })
    }

    setLanguageHandler = (lang) => {
        this.setState({ language: lang });
        localStorage.setItem('language', lang);
    }

    clearHistoryHandler = () => {
        this.setState({ history: [] });
        localStorage.setItem('playerHistory', JSON.stringify([]));
    }

    translateHandler = (key) => {
        const lang = this.state.language;
        return translations[lang]?.[key] || translations['en']?.[key] || key;
    }


    render(){
        return(
            <>
            <MyContext.Provider value={{
                state: this.state,
                addPlayer: this.addPlayerHandler,
                removePlayer: this.removePlayerHandler,
                next: this.nextHandler,
                getNewLooser: this.generateLooser,
                resetGame: this.resetGame,
                setLanguage: this.setLanguageHandler,
                clearHistory: this.clearHistoryHandler,
                t: this.translateHandler

            }}>
                {this.props.children}
            </MyContext.Provider>
             <ToastContainer/>
            </>
        )
    }

}

export {
    MyContext,
    MyProvider
}