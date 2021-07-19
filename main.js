  let dataObj = {
      "name": "Yellow Riddle Hiring Challenge",
      "products": [{
              "name": "Apple iPhone XR (White, 128 GB)",
              "seller": "SuperComNet",
              "img": "https://rukminim1.flixcart.com/image/224/224/jnj7iq80/mobile/y/q/d/apple-iphone-xr-mry52hn-a-original-imafa6zkfgwpnsgz.jpeg?q=90",
              "fAssured": true,
              "originalPrice": "52900",
              "currency": "INR",
              "discountPercentage": 11,
              "finalPrice": "46999",
              "offers": {
                  "count": 4
              },
              "delivery": {
                  "estimatedDate": "2021-06-22",
                  "replacementPolicy": true,
                  "replacementPolicyDuration": "7 Days",
                  "originalDeliveryCharge": 40,
                  "freeDelivery": true
              },
              "quantity": 1
          },
          {
              "name": "Apple iPhone 11 (Black, 64 GB)",
              "seller": "HydtelRetailSales",
              "img": "https://rukminim1.flixcart.com/image/224/224/kgiaykw0/mobile/y/n/y/apple-iphone-11-mhda3hn-a-original-imafwqepdb3fxtug.jpeg?q=90",
              "fAssured": true,
              "originalPrice": "54900",
              "currency": "INR",
              "discountPercentage": 8,
              "finalPrice": "49999",
              "offers": {
                  "count": 4
              },
              "delivery": {
                  "estimatedDate": "2021-06-22",
                  "replacementPolicy": true,
                  "replacementPolicyDuration": "7 Days",
                  "originalDeliveryCharge": 40,
                  "freeDelivery": true
              },
              "quantity": 1
          }
      ]
  };
  var price = Intl.NumberFormat('en-IN');
  var html;

  function incrementDecrementProduct(i, check) {

      if (check == 'plus') {
          if (document.getElementById("buttoncall" + i).value < 10) {
              document.getElementById("buttoncall" + i).value = parseInt(document.getElementById("buttoncall" + i).value) + 1;
              dataObj.products[i].quantity = document.getElementById("buttoncall" + i).value;
          }
      } else {
          if (document.getElementById("buttoncall" + i).value > 1) {
              document.getElementById("buttoncall" + i).value = parseInt(document.getElementById("buttoncall" + i).value) - 1;
              dataObj.products[i].quantity = document.getElementById("buttoncall" + i).value;
          }
      }
      if (document.getElementById("buttoncall" + i).value == 10) {
          document.getElementById("btn-disabled-increment-" + i).disabled = true;
          document.getElementById("btn-disabled-decrement-" + i).disabled = false;
      } else if (document.getElementById("buttoncall" + i).value == 1) {
          document.getElementById("btn-disabled-decrement-" + i).disabled = true;
          document.getElementById("btn-disabled-increment-" + i).disabled = false;
      } else {
          document.getElementById("btn-disabled-decrement-" + i).disabled = false;
          document.getElementById("btn-disabled-increment-" + i).disabled = false;
      }
      calaulateQuantity();
  }



  function calaulateQuantity() {
      var total = 0;
      var amount = 0;
      var discount = 0;
      dataObj.products.map((i) => {
          total = total + parseInt(i.quantity);
          amount = amount + (parseInt(i.quantity) * i.originalPrice);
          discount = discount + parseInt(i.originalPrice - i.finalPrice) * i.quantity;
      });
      document.getElementById("price").innerHTML = "&#x20B9;" + amount;
      document.getElementById("discount").innerHTML = "-&#x20B9;" + discount;
      document.getElementById("saving").innerHTML = "-&#x20B9;" + discount;
      document.getElementById("noOfItems").innerHTML = total;
      document.getElementById("totalAmount").innerHTML = "&#x20B9;" + (amount - discount);
  }

  renderList(dataObj.products);

  function renderList(products) {
      document.getElementById("container").innerHTML = "";
      products.map((item, index) => {
          var disabledDecrement = item.quantity == 1 ? 'disabled' : '';
          var disabledIncrement = item.quantity == 10 ? 'disabled' : '';
          const d = new Date(item.delivery.estimatedDate);
          let date = d.toDateString();
          html = `    
                    <div class="product-container clearfix">
                        <div class="clearfix">
                       <div class="product-top-section">
                            <div class="subdiv">
                                <img alt="${item.name}" class="img" height="100" src="${item.img}">
                            </div>
                            <div class="product-disription">
                                <p class="ph1">${item.name}</p>
                                <span class="ph2">Seller:${item.seller}</span>
                                <img src="logo.png" height="15px"><br><br>
                                <b><span class="ph3">&#x20B9;${ price.format(item.finalPrice)}</span></b>
                                <span class="ph4">&#x20B9;${price.format(item.originalPrice)}</span>
                                <b><span class="ph5">${item.discountPercentage }&#37; Off</span></b>
                                <b><span class="ph5">${item.offers.count} offers available</span></b>
                                <span class="symbol">  &#9432;</span>
                            </div>
                            <div class="product-side">
                                <p class="side">Delivery by ${date} | <span style=color:green ;>Free </span>&#x20B9;${item.delivery.originalDeliveryCharge}</p>
                                <p class="replace">${item.delivery.replacementPolicyDuration} Replacement Policy</p>
                            </div>
                       </div>

                        <div class="counter-container">
                            <button ${disabledDecrement} class="button" id="btn-disabled-decrement-${index}" onclick=incrementDecrementProduct(${index},'minus') >-</button>&nbsp;&nbsp;
                            <input readonly  id="buttoncall${index}" name="buttoncall${index}" type="text" value="${item.quantity}" size="1" /></input>&nbsp;&nbsp;
                            <button ${disabledIncrement} class="button" id="btn-disabled-increment-${index}" onclick=incrementDecrementProduct(${index},'plus') >+</button>
                            <span class="remove"> SAVE FOR LATER</span>
                            <span onclick =remove(${index}); class="remove"> REMOVE</span>
                        </div>

                    </div>  
                </div>`
          var node = document.createElement("div");
          node.innerHTML = html;
          document.getElementById("container").appendChild(node);
      })

  }
  var x = dataObj.products.length;
  document.getElementById("cartsub").innerHTML = x;
  document.getElementById("noOfItems").innerHTML = x;

  function remove(index) {
      dataObj.products.splice(index, 1);
      renderList(dataObj.products);
      document.getElementById("cartsub").innerHTML = dataObj.products.length;
      calaulateQuantity();
  }