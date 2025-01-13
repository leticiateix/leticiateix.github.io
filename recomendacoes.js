function toggleOption(element) {
    const form = document.getElementById('recommendationForm');
    const selectedOptions = form.querySelectorAll('.option.selected');

    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        element.querySelector('input').checked = false;
    } else if (selectedOptions.length < 4) {
        element.classList.add('selected');
        element.querySelector('input').checked = true;
    }
}

function selectOption(element) {
    const siblings = element.parentElement.querySelectorAll('.option');
    siblings.forEach(option => {
        option.classList.remove('selected');
        option.querySelector('input').checked = false;
    });

    element.classList.add('selected');
    element.querySelector('input').checked = true;
}

function submitForm() {
    const form = document.getElementById('recommendationForm');

    const preco = form.querySelector('[name="preco"]').value;
    const caracteristicas = Array.from(form.querySelectorAll('[name="caracteristicas"]:checked')).map(input => input.value);
    const uso = form.querySelector('[name="uso"]:checked')?.value;

    

    if (!preco) {
        alert('Preencha o campo de preço!');
        return;
    }

    if (caracteristicas.length !== 2) {
        alert('Selecione duas características do aparelho.');
        return;
    }

    if (!uso) {
        alert('Selecione um uso principal do aparelho.');
        return;
    }
    
    const respostas = {
        preco,
        caracteristicas,
        uso
    };

    console.log(respostas)
    arvoreDeDecisao(respostas)
}



function arvoreDeDecisao(respostas) {
    uso = respostas.uso
    preco = parseInt(respostas.preco)
    caracteristicas = respostas.caracteristicas

    console.log(uso)
    console.log(preco)
    console.log(caracteristicas)

    //orcamento_baixo
    if (preco < 3001) {
        // GRUPO 2
        if (
            caracteristicas.includes('bateria_duravel') && caracteristicas.includes('compacto') && uso == "uso_basico"
        ) {
            window.location.href = "grupo_2.html"
        // GRUPO 5
        } else if (
            caracteristicas.includes('bateria_duravel') && caracteristicas.includes('compacto') && uso == "uso_basico" ||
            caracteristicas.includes('bateria_duravel') && caracteristicas.includes('compacto') && uso == "edicao"
        ) {
            window.location.href = "grupo_5.html"
        }
    
    //orcamento_medio
    } else if (preco < 5001) {
        //GRUPO 1
        if (
            caracteristicas.includes('velocidade_alta') && caracteristicas.includes('armazenamento_alto') && uso == "edicao"  ||
            caracteristicas.includes('velocidade_alta') && caracteristicas.includes('compacto') && uso == "edicao"  ||
            caracteristicas.includes('velocidade_alta') && caracteristicas.includes('bateria_duravel') && uso == "edicao" 
        ) {
            window.location.href = "grupo_1.html"
        //GRUPO 2
        } else if (
            caracteristicas.includes('bateria_duravel') && caracteristicas.includes('compacto') && uso == "uso_basico"
        ) {
            window.location.href = "grupo_2.html"
        //GRUPO 3
        } else if (
            caracteristicas.includes('velocidade_alta') && caracteristicas.includes('bateria_duravel') && uso == "jogos"
        ) {
            window.location.href = "grupo_3.html"
        //GRUPO 4
        } else if (
            caracteristicas.includes('bateria_duravel') && caracteristicas.includes('compacto') && uso == "edicao" 
        ) {
            window.location.href = "grupo_4.html"
        }

    //orcamento_alto
    } else if (preco < 8001) {
        //GRUPO 3
        if (
            caracteristicas.includes('velocidade_alta') && caracteristicas.includes('bateria_duravel') && uso == "jogos"
        ) {
            window.location.href = "grupo_3.html"
        }
    //orcamento_muito_alto
    } else if (preco >= 8001) {
        //GRUPO 1
        if (
            caracteristicas.includes('velocidade_alta') && caracteristicas.includes('bateria_duravel')  && uso == "edicao" ||
            caracteristicas.includes('velocidade_alta') && caracteristicas.includes('compacto') && uso == "edicao"
        ) {
            window.location.href = "grupo_1.html"
        } 

    } else {
        console.log('Nenhum grupo atendido')
        window.location.href = "grupo_4.html"
    }
    
    // window.location.href = "grupo_4.html";
    
}

function ordenarPeloScore(array) {
    return array.sort((a, b) => b.score - a.score);
}

function getnotebooksPeloNome(nomes, notebooks) {
    return notebooks.filter(notebook => nomes.includes(notebook.titulo));
}

function renderizarNotebooks() {
    const notebooks_sugeridos = JSON.parse(localStorage.getItem("notebooks_sugeridos"));

    if (notebooks_sugeridos && notebooks_sugeridos.length > 0) {
        const resultContainer = document.querySelector('.result-container');

        resultContainer.innerHTML = '';

        notebooks_sugeridos.forEach((notebook, index) => {
            const notebookDiv = document.createElement('div');
            notebookDiv.classList.add('notebook');
            notebookDiv.style.position = 'relative';

            const crownSpan = document.createElement('span');
            if (index == 0) {
                crownSpan.classList.add('crown');
                crownSpan.textContent = '🥇';
                notebookDiv.appendChild(crownSpan);
            }

            if (index == 1) {
                crownSpan.classList.add('crown');
                crownSpan.textContent = '🥈';
                notebookDiv.appendChild(crownSpan);
            }

            if (index == 2) {
                crownSpan.classList.add('crown');
                crownSpan.textContent = '🥉';
                notebookDiv.appendChild(crownSpan);
            }

            // Criar a imagem
            const img = document.createElement('img');
            img.src = notebook.imagem;
            img.alt = notebook.titulo;

            // Criar o título
            const title = document.createElement('h5');
            title.classList.add('notebook-title');
            title.textContent = notebook.titulo;

            // Criar informações do notebook
            const notebookBody = document.createElement('div');
            notebookBody.classList.add('notebook-body');

            const preco = document.createElement('p');
            if (notebook.preco_v) {
                preco.innerHTML = `<strong>Preço: </strong> R$${notebook.preco_v}`;
            } else {
                preco.innerHTML = `<strong>Preço: </strong>` + "Não informado"
            }

            const memoria = document.createElement('p');
            memoria.innerHTML = `<strong>Memória RAM:</strong> ${notebook.memoria}`;

            const armazenamento = document.createElement('p');
            armazenamento.innerHTML = `<strong>Capacidade do SSD:</strong> ${notebook.armazenamento}`;

            const caracteristicas = document.createElement('p');
            caracteristicas.innerHTML = `<strong>Principais usos:</strong> ${notebook.caracteristicas}`;

            notebookBody.appendChild(preco);
            notebookBody.appendChild(limite);
            notebookBody.appendChild(caracteristicas);


            const link = document.createElement('a');
            link.href = notebook.link;
            link.classList.add('btn', 'btn-primary', 'btn-pedir');
            link.target = "_blank";
            link.textContent = "Comprar";

            if (index === 0) {
                notebookDiv.appendChild(crownSpan);
            }
            notebookDiv.appendChild(img);
            notebookDiv.appendChild(title);
            notebookDiv.appendChild(notebookBody);
            notebookDiv.appendChild(link);

            resultContainer.appendChild(notebookDiv);
        });
    } else {
        const message = document.createElement('p');
        message.textContent = 'Sem resultados.';
        document.querySelector('.result-container').appendChild(message);
    }
}