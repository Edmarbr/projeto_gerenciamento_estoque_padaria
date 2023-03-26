<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciamento padaria</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <header>
        <h1>Padaria</h1>
    </header>

    <main>
        <div class="div_left">
            <label for="iProdutos"><h2>Produtos:</h2></label>

            <?php

            include "conexaoBD.php";

            $Sql = mysqli_query($conectarBD, "SELECT nome FROM produtos");
            while ($valores = mysqli_fetch_row($Sql)) {          // adicionando o nome dos produtos em $valores
                $i = 0;
                echo "<div class=div_CheckButton>
                        <input type='checkbox' name='' id='bntCheck$i' class='checkButtons'>".
                        "<label for='bntCheck$i' class='Labels'>$valores[$i]</label>
                      </div>";      // escreve o input e a label com o nome dos produtos
                $i++;
            }
            ?>
            <br>
            <form action="compra.php" method="post" id="Form">
                <table>
                    <thead>
                        <th scope="col">Produto</th>
                        <th scope="col">Quantidade</th>
                    </thead>
                    <tbody id="Tbody">
                    </tbody>
                </table>
                <br>
                <input type="button" value="Finalizar Compra" id="EnviarCompra">
            </form>
        </div>
        <br>
        <div class="tabela_estoque">
            <h1>Estoque</h1>
            <table id="tabelaEstoque">
                <thead>
                    <th scope="col">Nome</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Estado</th>
                </thead>
                <tbody>
                    <?php
                    $sql = mysqli_query($conectarBD, "SELECT nome, quantidade, qtd_media FROM produtos");

                    while ($valor = mysqli_fetch_row($sql)) {
                        $mediaBaixa = $valor[2] - 10;       // determina a quantidade media
                        $mediaAlta = $valor[2] + 10;        // determina a quantidade media

                        if ($valor[1] < $valor[2]) {
                            $estoque = "Baixo";
                        }
                        if ($valor[1] > $valor[2]) {
                            $estoque = "Alto";
                        }
                        if ($valor[1] >= $mediaBaixa && $valor[1] <= $mediaAlta) {
                            $estoque = "Normal";
                        }
                        echo "<tr>
                                <td>$valor[0]</td>
                                <td class=QTDatual>$valor[1]</td>
                                <td>$estoque</td>
                              </tr>";       // escreve o produto, a quantidade e o estado do estoque
                    }

                    mysqli_close($conectarBD);
                    ?>
                </tbody>
            </table>
        </div>
    </main>

    <script src="script.js"></script>
</body>

</html>