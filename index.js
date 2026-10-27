const readline = require("readline")
const Cliente = require("./cliente")

const cliente = new Cliente()
const leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const ler = (pergunta) => {
  return new Promise((resolve) => {
    leitor.question(pergunta, (input) => resolve(input))
  })
}

const menu = async () => {
  console.log("1- Listar \n2- Incluir\n3- Alterar\n4- Excluir\n0- Sair")

  const valor = await ler("Digite a opção -> ")
  return eval(valor)
}

const obterDados = async () => {
  let nome = await ler("Nome: ")
  let ataque = await ler("Ataque: ")
  let defesa = await ler("Defesa: ")

  return [nome, eval(ataque), eval(defesa)]
}

const incluir = async () => {
  const [nome, ataque, defesa] = await obterDados()
  return await cliente.incluir(nome, ataque, defesa)
}

const listar = async () => {
  console.log("\nDigite o ID (0 para buscar todos)")
  let id = eval(await ler("-> "))
  let dados

  if (id != 0) {
    dados = await cliente.obter(id)
  } else {
    dados = await cliente.obterTodos()
  }

  console.log(dados)
}

const alterar = async () => {
  const id = eval(await ler("ID para alterar\n-> "))
  const dados = await cliente.obter(id)

  console.log(dados)

  const [nome, ataque, defesa] = await obterDados()

  await cliente.alterar(id, nome, ataque, defesa)
}

const excluir = async () => {
  const id = eval(await ler("Digite o ID a ser DELETADO\n-> "))
  await cliente.excluir(id)
}

const principal = async () => {
  let opcao

  do {
    opcao = await menu()
    switch (opcao) {
      case 1:
        await listar()
        break
      case 2:
        await incluir()
        break
      case 3:
        await alterar()
        break
      case 4:
        await excluir()
        break
    }
  } while (opcao != 0)
}

principal().then(() => leitor.close())
