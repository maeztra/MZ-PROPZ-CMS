
# MZ PROPZ

Nesta documentação estão todos os passos necessários para a instalação e customização do plugin da Propz.

# Dependências

Para o funcionamento correto do plugin, as seguintes dependências são necessárias:

-**Slick:** 
É a biblioteca responsável pelo carrossél de produtos. A biblioteca deve ser carregada na página em que a vitrine será gerada. Caso o Slick já esteja sendo usado na página, esse passo deve ser ignorado. Obtenha o Slick neste link: https://kenwheeler.github.io/slick/ 

-**vtexid:** 
Uma das bibliotecas nativas da Vtex, usada para gerenciar o login do usuário. O jeito mais simples de carregar a biblioteca na página é renderizando o controle customizado `<vtex.cmc:welcomeMessage/>`. Se o conteúdo do controle customizado não deve aparecer na página, esconder por CSS é a forma recomendada. Para verificar se a biblioteca já foi carregada, basta abrir o console do navegador e digitar vtexid. 

![vtexid carregado](https://user-images.githubusercontent.com/60937226/134206833-9560b5cf-92bb-4964-a446-2df661906fda.png)



-**Propz Service:** 
Aplicativo da VTEX App Store. Responsável pela comunicação com a Propz. Deve ser configurado corretamente para que as customizações no front-end funcionem corretamente. Ainda em estágio de publicação na VTEX App Store. 

![Propz Service](https://user-images.githubusercontent.com/60937226/134207118-94b28099-a257-4332-8e83-9d1343b758d2.png)


# Instalação das Tags GTM
O plugin consiste de 4 Tags do GTM e um plugin Vtex. Nesta seção vamos detalhar o processo de instalação das Tags.

## Propz Config
É a tag de inicialização e configuração do plugin. Deve ser criada sem nenhum acionador. Criar como tag de HTML Personalizado

![Propz Config](https://user-images.githubusercontent.com/60937226/134207712-ccae7880-ed21-49b6-951d-12ca13e9ffad.png)

Para o funcionamento do plugin, não é necessário fazer nenhuma alteração nesta Tag. Em uma seção posterior do documento será explicado como customizar o plugin.

## Propz Core
A Tag `Propz Core` deve ser chamada na página em que a vitrine será carregada. Se a vitrine deve aparecer na Home, então a tag deve ser disparada apenas na Home do ecommerce.
Criar como tag de HTML Personalizado

![Propz Core](https://user-images.githubusercontent.com/60937226/134207830-18e3028c-c63c-40f5-ab1f-021b14c8169e.png)

Dentro de configurações avançadas, configure para que a tag `Propz Config` seja disparada **após** esta tag

![Propz Core 2](https://user-images.githubusercontent.com/60937226/134207933-8db7d318-19e5-485c-8c20-29fc1c9c576e.png)


## Propz Checkout 
A Tag `Propz Checkout` deve ser disparada apenas nas páginas de checkout, ou seja, as páginas que iniciam com /checkout na URL. Criar como tag de HTML Personalizado

![Propz Checkout](https://user-images.githubusercontent.com/60937226/134208305-a06bac3b-c7de-4f5e-8ba2-87f2137eefb4.png)

## Propz Orderplaced
A Tag `Propz Checkout` deve ser disparada apenas na página de finalização do pedido ou no evento de finalização do pedido. Criar como tag de HTML Personalizado

![Propz Orderplaced](https://user-images.githubusercontent.com/60937226/134208914-ad669f4c-c9b1-42a9-a497-a3d4bfcc8a08.png)


# Customização do plugin
A customização do Plugin é feita a partir da tag `Propz Config`. Na tag há um objeto de configuração nomeado `config`. Para facilitar a customização, o nome de todas as configurações possíveis estão comentadas dentro do objeto `config`.

![Propz Config config obj](https://user-images.githubusercontent.com/60937226/134209117-a204edec-d293-4155-817e-848fe1ace84c.png)


| Propriedade | Tipo | Descrição|
|--|--| -- |
|containerClass |`String`  |A classe que o plugin deve renderizar a vitrine. Padrão: `".propz-container-div"`|
|clickToActivateOfferText|`String`  | Mensagem que aparecerá dentro do botão de ativar oferta na vitrine, acima do botão comprar. Padrão:  `"Ativar Oferta"`|
|activatedOfferText|`String`  | Mensagem mostrada no botão após o usuário ativar a oferta. Padrão:`"Oferta Ativada!"`  |
|addToCartText|`String`  | Mensagem no botão de adicionar ao carrinho. Padrão:`"Adicionar ao Carrinho"`   |
|clickToLoginText|`String`  | Mensagem mostrada no botão de login quando o usuário não estiver logado. Padrão: `"Clique para se logar"` |
|signUpButtonText|`String`  |Mensagem mostrada quando o usuário está logado mas ainda não está cadastrado no sistema Propz. Padrão:`"Clique para se cadastrar"`|
|addToCartCallback|`Function`  | Função de callback chamada após a adição de um produto pela vitrine do plugin. Parâmetros aceitos: `event`,`item`,`orderForm` e `buttonElement`  |
|failedAddToCartCallback|`Function`  | Função de callback caso a adição do produto ao carrinho falhe. Muitas vezes a adição de produtos ao carrinho falha pois multiplas tentativas foram feitas em paralelo (adicionando mais um produto antes da requisição anterior terminar). Neste caso, as requisições anteriores são **canceladas**, mantendo apenas a requisição mais recente. Parâmetros aceitos: `item`,`error`,`buttonElement`  |
|priceFormatter|`Function`  | Função para formatação de preço, recebe de parâmetro um `float`. Padrão:`(value)=>value.toLocaleString("pt-br",{style:  "currency", currency:  'BRL'})`   |
|slickConfig|`Object`  | Configurações do slick. Veja a documentação do Slick para mais detalhes. https://kenwheeler.github.io/slick/   |
|shelfHtml|`String`  | Html padrão da vitrine. Recebe uma string no formato de template. Mais informações abaixo.   |
|vtexSigninHtml|`String`  |  Html padrão do bloco de login. Recebe uma string no formato de template. Mais informações abaixo. |
|signupHtml|`String`  | Html padrão do bloco de signup. Recebe uma string no formato de template. Mais informações abaixo.   |
|shelfHtmlSkeleton|`String`  | Html que será mostrado enquanto a requisição para buscar as vitrines é feita. |
|signupSkeleton |`String`  | Html que será mostrado enquanto a requisição para buscar a URL de cadastro é feita  |

## Templates
Os templates recebe uma string HTML, onde as variáveis são envolvidas em `{}`. Exemplo: `<img src={imgUrl}></img>` para renderizar a imagem do produto. 

Os templates `shelfHtml`, `vtexSigninHtml` e `signupHtml` podem ser alterados pelo objeto `config` na tag `Propz Config`

### shelfHtml
A variável shelfHtml recebe uma string HTML, onde as variáveis são envolvidas em `{}`. Exemplo: `{imgUrl}` para representar a URL da imagem
Lista de variáveis.
| Variável | Descrição  |
|--|--|
| productUrl | URL do produto  |
| imgUrl | Imagem do produto  |
| name | Nome do produto  |
| listPrice | Preço "De". Preço mais alto  |
| sellingPrice | Preço "Por". Menor preço  |
| buttonTemplate | Bloco de HTML dos botões da vitrine. Este bloco não é diretamente customizável por variáveis de template, pois alterações feitas no bloco podem afetar as funcionalidades. Para alterar os textos dos botões, use o objeto `config` na Tag `Propz Config`  |


**shelfHtml Padrão:** 
```
<div class="mz-propz-shelf">
    <div class="mz-propz-shelf-image">				
        <a class="mz-propz-shelf-image-link img-responsive" href="{productUrl}">
            <img src="{imgUrl}"/>
        </a>
    </div>
    <div>
        <div class="mz-propz-product-name">
            <h1>
                <a href="{productUrl}" title="{name}">{name}</a>
            </h1>
        </div>                        
        <div class="mz-propz-price-div">
            <p class="mz-propz-list-price">
                <span>De: </span>
                <span>{listPrice}</span>
            </p>
            <p class="mz-propz-selling-price">
                <span>Para: </span>
                <span>{sellingPrice}</span>
            </p>
        </div>                    
        {buttonTemplate}
    </div>
</div>
```

![Shelf example](https://user-images.githubusercontent.com/60937226/134209341-1b3646e7-b31b-49ac-aead-025123ff56de.png)


### vtexSigninHtml
HTML que será mostrado caso o usuário não esteja logado.

**Lista de variáveis:**
| Variável | Descrição  |
|--|--|
| clickToLoginBtn | Botão para o usuário se logar. Texto do botão definido na variável `config`, na Tag `Propz Config`  |

**vtexSigninHtml Padrão:**
```
<div class="mz-propz-signup-container">
    <div class="mz-propz-signup-left">
        <div class="mz-propz-text-container">
            <div class="mz-propz-header">Promoções da Propz</div>
            <div class="mz-propz-body">Faça login para ver promoções incriveis e feitas para você!</div>
            <div class="mz-propz-button">
                <button onClick="MzPropz.propzLogin()">{clickToLoginText}</button>
            </div>
        </div>
    </div>
    <div class="mz-propz-signup-right">
        <img src="https://picsum.photos/id/488/1042/583" alt="">
    </div>
</div>       
```

![vtexSigninHtml example](https://user-images.githubusercontent.com/60937226/134209644-176abf23-5c54-4710-8af1-e9e00234a388.png)

        

### signupHtml
Html mostrado caso o usuário esteja logado, mas ainda não possua cadastro no sistema Propz.

**Lista de variáveis:**
| Variável | Descrição  |
|--|--|
| signUpBtn | Botão para o usuário se cadastrar. Será direcionado para o link enviado cadastadrado no campo `Form Url` dentro do App Vtex. Para alterar o texto do botão, altere o objeto `config` dentro da Tag `Propz Config`   |

**signupHtml Padrão:**
```            
<div class="mz-propz-signup-container">
    <div class="mz-propz-signup-left">
        <div class="mz-propz-text-container">
            <div class="mz-propz-header">Promoções da Propz</div>
            <div class="mz-propz-body">Cadastre-se e receba promoções incriveis e feitas para você!</div>
            {signUpBtn}
        </div>
    </div>
    <div class="mz-propz-signup-right">
        <img src="https://picsum.photos/id/488/1042/583" alt="">
    </div>
</div>
```

![signupHtml example](https://user-images.githubusercontent.com/60937226/134209988-89433f43-6f39-4b3e-a765-05e23ef8d6c0.png)


# CSS
O arquivo de CSS `propz_default_styles.css` representa o estilo padrão do Plugin. A customização do CSS pode ser feita de forma livre.


