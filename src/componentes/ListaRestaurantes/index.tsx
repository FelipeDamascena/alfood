import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

// esses são os posséveis parâmetros que podemos enviar para a API
interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('')

  // agora, o carregarDados recebe opcionalmente opções de configuração do axios
  const carregarDados = async (url: string, opcoes: AxiosRequestConfig = {}) => {
    try {
      const resposta = await axios.get<IPaginacao<IRestaurante>>(url, opcoes);

      // Atualiza os estados com os dados retornados pela API
      setRestaurantes(resposta.data.results);
      setProximaPagina(resposta.data.next);
      setPaginaAnterior(resposta.data.previous);

      return resposta.data; // Retorna os dados para maior flexibilidade
    } catch (erro) {
      console.error('Erro ao carregar os dados:', erro);

      // Se necessário, adicione aqui a lógica para manipular erros (ex: exibir uma mensagem)
      throw erro; // Repropaga o erro para controle em outro local
    }
  };

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    // Se a busca for por ID (somente números), use a rota específica
    if (!isNaN(Number(busca)) && busca) {
      const url = `http://localhost:8000/api/v2/restaurantes/${busca}/`;

      // Chama a função carregarDados com a rota específica para o ID
      axios.get<IRestaurante>(url)
        .then(resposta => {
          // Atualiza o estado com o restaurante encontrado (coloca dentro de um array)
          setRestaurantes([resposta.data]);  // Nota: aqui estamos colocando o restaurante dentro de um array
          setProximaPagina('');  // Reseta paginação, pois é um resultado único
          setPaginaAnterior('');
        })
        .catch(erro => {
          console.log('Erro ao carregar o restaurante por ID:', erro);
        });

      return; // Interrompe a função após buscar por ID
    }

    // Caso contrário, faça a busca geral com "search"
    const opcoes: { params?: IParametrosBusca } = {};

    // Adiciona o termo de busca geral
    if (busca) {
      opcoes.params = {
        ...opcoes.params,
        search: busca,  // Campo de busca
      };
    }

    // Adiciona a ordenação, se existir (facultativo)
    if (ordenacao) {
      opcoes.params = {
        ...opcoes.params,
        ordering: ordenacao, // Ordenação (opcional)
      };
    }

    // Faz a requisição para a API de listagem geral
    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
      .catch(erro => {
        console.log('Erro ao carregar os dados:', erro);
      });
  };

  useEffect(() => {

    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>legais do mundo</em>!</h1>
    <form onSubmit={buscar}>
      <div>
        <input
          type="text"
          value={busca}
          onChange={evento => setBusca(evento.target.value)}
          placeholder="Digite um nome ou id de restaurante"
        />
      </div>
      <div>
        <label htmlFor="select-ordenacao">Ordenação:</label>
        <select
          name="select-ordenacao"
          id="select-ordenacao"
          value={ordenacao}
          onChange={evento => setOrdenacao(evento.target.value)}
        >
          <option value="">Padrão</option>
          <option value="id">Por ID</option>
          <option value="nome">Por Nome</option>
        </select>
      </div>
      <div>
        <button type='submit'>buscar</button>
      </div>
    </form>
    <h3>Lista de Restaurantes a baixo: </h3>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
      Página Anterior
    </button>}
    {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
      Próxima página
    </button>}
  </section>)
}

export default ListaRestaurantes