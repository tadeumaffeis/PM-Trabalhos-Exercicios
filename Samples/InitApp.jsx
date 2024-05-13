import GridDivTable from './components/GridDivTable';
//import fetchData from './components/util.js';
//import './App.css';
//import json from './data/table.information.json';
//import loadJson from './components/util.js';
import React from 'react';

export default class InitApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      header: [],
      data: [],
      loading: true,
      url: props.url,
    };
  }

  componentDidMount() {
    console.log('componentDidMount: Componente montado');
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);  // Substitua pela URL desejada
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        this.setState({
          caption: json.information.title.text,
          header: json.information.colunmHeader.content,
          data: json.information.reservations.content,
          loading: false,
        });  // Armazena os dados no estado
      } catch (error) {
        console.error("Failed to load JSON:", error);
        this.setState({loading: false});  // Atualiza o estado de carregamento em caso de erro
      }
    };
    fetchData(this.state.url ? this.state.url : 'none');
  }

  render() {
    console.log('InitApp:render(): Renderizando', this.state);
    const caption = this.state.caption;
    const header = this.state.header.map((cell) => {
      return cell;
    });
    const content = this.state.data.map((row) => {
      return row.content.map((cell) => {
        return cell;
      });
    });
    return (
      <GridDivTable caption={caption} header={header} data={content} />
    );
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps: Recebeu novas props ou state está sendo atualizado');
    // Retorne um objeto para atualizar o estado, ou null para não atualizar nada
    return null;
  }
  componentDidMount() {
    console.log('componentDidMount: Componente montado');
    /*
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do usuário');
        }
        return response.json();
      })
      .then(userData => this.setState({ userData, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
      console.log('componentDidMount: ', this.state);
   

      const fetchData = async (url) => {
        try {
          const response = await fetch(url);  // Substitua pela URL desejada
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const json = await response.json();
          this.newState.json = json;  // Armazena os dados no estado
          this.state = {
            caption: json.information.title.text,
            header: json.information.colunmHeader.content,
            data: json.information.reservations.content,
            loading: false,
          }
          console.log("fetchData: ", this.state, this.newState.json);
        } catch (error) {
          console.error("Failed to load JSON:", error);
          this.state.setLoading(false);  // Atualiza o estado de carregamento em caso de erro
        }
      };
      fetchData('http://localhost:5173/data/table.information.json');
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      console.log('shouldComponentUpdate: Deve o componente re-renderizar?');
      const json = this.newState.json;
      if (!json) {
        return false;
      }
      this.state = (
        {
          caption: json.information.title.text,
          header: json.information.colunmHeader.content,
          data: json.information.reservations.content,
          loading: false,
        }
      );  // Armazena os dados no estado
      console.log('shouldComponentUpdate: \n', this.state);
      return true;  // Retorna true para continuar com a re-renderização
    }
  
    getSnapshotBeforeUpdate(prevProps, prevState) {
      console.log('getSnapshotBeforeUpdate: Captura um snapshot antes da atualização do DOM');
      return null;  // Você poderia retornar algum valor para passar para componentDidUpdate
    }
  
    componentDidUpdate(prevProps, prevState, snapshot) {
      console.log('componentDidUpdate: Componente atualizado');
    }
  
    componentWillUnmount() {
      console.log('componentWillUnmount: Componente será desmontado');
    }
*/
