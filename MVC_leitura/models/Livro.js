class Livro {
    constructor(id, titulo, autor, paginas){
        if(!titulo || !autor){
            throw new Error('Titulo ou autor são obrigatorios')
        }
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.paginas = paginas; 
        this.lido = false;
    }
    //metodo
    descricao(){
        return`${this.titulo} - ${this.autor}`       //chamando o titulo e o autor do livro
    }
    //metodo com condição
    verificarTamanho(){
        if(this.paginas <= 150) return 'Leitura curta';
        if(this.paginas <= 300) return 'Leitura Media';
        return 'Leitura Longa';
    }
    //metodo
    marcarComoLido(){
        this.lido = true;
        
    }
}
export default Livro