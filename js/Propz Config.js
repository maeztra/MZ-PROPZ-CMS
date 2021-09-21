<script>
    $(function(){
        try{
            var config = {
                // containerClass:,
                // clickToActivateOfferText:,
                // activatedOfferText:,
                // addToCartText:,
                // clickToLoginText:,
                // signUpButtonText:,
                // addToCartCallback:,
                // failedAddToCartCallback:,
                // shelfHtml:,
                // vtexSigninHtml:,
                // signupHtml:,
                // shelfHtmlSkeleton:,
                // signupSkeleton:,
                // priceFormatter:,
                // slickConfig:,
            }
            var mzPropz = new MzPropz(config)
            mzPropz.init()
        }catch(e){
            console.warn('Could not initialize MzPropz')
        }
    })
</script>
