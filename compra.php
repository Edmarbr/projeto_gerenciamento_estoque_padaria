<?php

    function Comprar($valor, $idProd)
    {
        include "conexaoBD.php";
        $quantidadeEstoque = mysqli_fetch_row(mysqli_query($conectarBD, "SELECT quantidade FROM produtos WHERE cod_produto = $idProd"));        // retorna a quantidade no estoque
        if ($valor > $quantidadeEstoque[0]) {
            header("Location: index.php");
            exit;
        } else {
            mysqli_query($conectarBD, "UPDATE produtos SET quantidade = $quantidadeEstoque[0] - $valor WHERE cod_produto = $idProd");       // altera a quantidade do estoque
        }

        
        mysqli_close($conectarBD);
    };

    for ($i = 0; $i < 8; $i++) {
        if (isset($_POST["F_produto$i"])){      // verifica quais inputs existem
            $id = $i+1;
            Comprar($_POST["F_produto$i"], $id);
        }
    }
    header("Location: index.php");

?>