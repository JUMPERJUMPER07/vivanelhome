const body = new FormData();
body.append("name", "Curl Test Product");
body.append("shortDescription", "Test product from powershell script dsdsdsd");
body.append("description", "A long description so it passes validation dsdsdsd");
body.append("oldPrice", "0");
body.append("price", "19.99");
body.append("discountLabel", "");
body.append("category", "Academia");
body.append("categorySlug", "academia");
body.append("affiliateUrl", "https://shopee.com.br/");
body.append("cta", "Ver Produto");
body.append("badge", "Teste");
body.append("iconKey", "package");
body.append("accentFrom", "#000000");
body.append("accentTo", "#ffffff");

fetch("https://www.vivanelhome.com.br/api/custom-products", {
  method: "POST",
  body: body
}).then(res => res.json()).then(console.log).catch(console.error);
