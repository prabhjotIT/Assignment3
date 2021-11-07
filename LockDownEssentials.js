const e = require("cors");
const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    ITEMS:   Symbol("food"),
    COUNT:   Symbol("litter"),
    UPSELL:  Symbol("extras")
});

module.exports = class LockDownEssentials extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sitem="",
        this.sSpecies = "";
        this.sFood = "";
        this.sLitter = "";
        this.sExtras = "";
        this.sTotal=0;
        this.sEachPrice=0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.ITEMS;
                aReturn.push("Welcome to CurbSide hardware.");
                aReturn.push(`For a list of what we sell tap:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                aReturn.push(`write any item name to purchase it`);
                break;
            case OrderState.ITEMS:
                this.stateCur = OrderState.COUNT;
                if(sInput.toLowerCase() == "broom" || sInput.toLowerCase() == "brooms and dustbin"){
                    this.sitem="Brooms and Dustbin"
                    this.sEachPrice=3.2;
                      //this.sSpecies = "cat";
                  }else if(sInput.toLowerCase() == "snow shovels") {
                    this.sitem = "Snow shovels";
                    this.sEachPrice=2.8;
                  }
                  else if(sInput.toLowerCase() == "garbage and recycling container") {
                      this.sitem = "Garbage and recycling container";
                      this.sEachPrice=1.6;
                  }
                  else if(sInput.toLowerCase() == "light bulbs") {
                      this.sitem = "Light bulbs";
                      this.sEachPrice=1;
                  }
                  else if(sInput.toLowerCase() == "household cleaners") {
                      this.sitem = "Household Cleaners";
                      this.sEachPrice=2;
                  }
                  else if(sInput.toLowerCase() == "furnace filters") {
                      this.sitem = "Furnace filters";
                      this.sEachPrice=3.4;
                  }
                  else if(sInput.toLowerCase() == "screen door") {
                      this.sitem = "Screen door";
                      this.sEachPrice=1.5;
                  } 
                  else {
                    this.stateCur = OrderState.ITEMS;
                    aReturn.push("Please choose something from the list and make sure your spellings are correct");
                    break;
                  }
                  aReturn.push("How many "+this.sitem+" you want, write digits only");
                  break;
            case OrderState.COUNT:
                this.stateCur = OrderState.UPSELL;//put new state
                if(sInput.toLowerCase()<="0" || isNaN(sInput))
                {
                    aReturn.push("Please choose a valid amount");
                    this.stateCur = OrderState.COUNT; 
                    break; 
                   
                }
                aReturn.push("Got it ");  
                this.sTotal+=this.sEachPrice*sInput;//to calc total
                aReturn.push("We also have some Up-Sell item we think that you would like to have you can see them in the same list");
                aReturn.push("so what would you like, if nothing write no");
                break;
            case OrderState.UPSELL:
                if(sInput.toLowerCase()=="no")
                {
                    //change state to final state
                    aReturn.push("thats ok, thankyou for shopping with us, please dont forget to pay.");
                }
                else if(sInput.toLowerCase()=="simonize car cloths"){
                    this.sExtras="Simonize car cloths";
                    this.sTotal+=1;
                }
                else if(sInput.toLowerCase()=="geeky headlamps"){
                    this.sExtras="Geeky headlamps";
                    this.sTotal+=5;
                }
                else if(sInput.toLowerCase()=="ear buds"){
                    this.sExtras="Ear buds";
                    this.sTotal+=1;
                }
                else if(sInput.toLowerCase()=="de-scaler for a kettle"){
                    this.sExtras="De-scaler for a kettle";
                    this.sTotal+=2;
                }
                else{
                    this.stateCur = OrderState.UPSELL;
                    aReturn.push("we do not recognize this item please check again,check spellings too");
                    break;
                }
            aReturn.push(`Your sum comes to ${this.sTotal}$ and with 13% tax your total is ${(this.sTotal*.13)+this.sTotal}$`);
                aReturn.push(`We will text you when we are ready to meet you at curbside`)
                this.isDone(true);
                break;
        }
        return aReturn;
    }
    renderForm(){
      // your client id should be kept private
      return(`<html>

      <head>
          <meta content="text/html; charset=UTF-8" http-equiv="content-type">
          <style type="text/css">
              ol {
                  margin: 0;
                  padding: 0
              }
      
              table td,
              table th {
                  padding: 0
              }
      
              .c8 {
                  border-right-style: solid;
                  padding: 5pt 5pt 5pt 5pt;
                  border-bottom-color: #000000;
                  border-top-width: 1pt;
                  border-right-width: 1pt;
                  border-left-color: #000000;
                  vertical-align: top;
                  border-right-color: #000000;
                  border-left-width: 1pt;
                  border-top-style: solid;
                  border-left-style: solid;
                  border-bottom-width: 1pt;
                  width: 235.5pt;
                  border-top-color: #000000;
                  border-bottom-style: solid
              }
      
              .c2 {
                  border-right-style: solid;
                  padding: 5pt 5pt 5pt 5pt;
                  border-bottom-color: #000000;
                  border-top-width: 1pt;
                  border-right-width: 1pt;
                  border-left-color: #000000;
                  vertical-align: top;
                  border-right-color: #000000;
                  border-left-width: 1pt;
                  border-top-style: solid;
                  border-left-style: solid;
                  border-bottom-width: 1pt;
                  width: 234pt;
                  border-top-color: #000000;
                  border-bottom-style: solid
              }
      
              .c4 {
                  -webkit-text-decoration-skip: none;
                  color: #000000;
                  font-weight: 400;
                  text-decoration: underline;
                  vertical-align: baseline;
                  text-decoration-skip-ink: none;
                  font-size: 18pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c5 {
                  -webkit-text-decoration-skip: none;
                  color: #000000;
                  font-weight: 400;
                  text-decoration: underline;
                  vertical-align: baseline;
                  text-decoration-skip-ink: none;
                  font-size: 44pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c10 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 11pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c3 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 18pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c12 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: left;
                  height: 11pt
              }
      
              .c6 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 15pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c15 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 30pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c7 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: center;
                  height: 11pt
              }
      
              .c11 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: center
              }
      
              .c0 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.0;
                  text-align: center
              }
      
              .c19 {
                  border-spacing: 0;
                  border-collapse: collapse;
                  margin-right: auto
              }
      
              .c17 {
                  background-color: #ffffff;
                  max-width: 468pt;
                  padding: 72pt 72pt 72pt 72pt
              }
      
              .c1 {
                  height: 72pt
              }
      
              .c14 {
                  height: 76.5pt
              }
      
              .c9 {
                  height: 92.2pt
              }
      
              .c16 {
                  height: 71.1pt
              }
      
              .c13 {
                  height: 91.5pt
              }
      
              .c18 {
                  height: 11pt
              }
      
              .title {
                  padding-top: 0pt;
                  color: #000000;
                  font-size: 26pt;
                  padding-bottom: 3pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .subtitle {
                  padding-top: 0pt;
                  color: #666666;
                  font-size: 15pt;
                  padding-bottom: 16pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              li {
                  color: #000000;
                  font-size: 11pt;
                  font-family: "Arial"
              }
      
              p {
                  margin: 0;
                  color: #000000;
                  font-size: 11pt;
                  font-family: "Arial"
              }
      
              h1 {
                  padding-top: 20pt;
                  color: #000000;
                  font-size: 20pt;
                  padding-bottom: 6pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h2 {
                  padding-top: 18pt;
                  color: #000000;
                  font-size: 16pt;
                  padding-bottom: 6pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h3 {
                  padding-top: 16pt;
                  color: #434343;
                  font-size: 14pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h4 {
                  padding-top: 14pt;
                  color: #666666;
                  font-size: 12pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h5 {
                  padding-top: 12pt;
                  color: #666666;
                  font-size: 11pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h6 {
                  padding-top: 12pt;
                  color: #666666;
                  font-size: 11pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  font-style: italic;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
          </style>
      </head>
      
      <body class="c17">
          <p class="c11"><span class="c5">Welcome to CurbSide</span></p>
          <p class="c11"><span class="c4">Menu:</span></p><a id="t.5e025808b1f5a92c188509e7008e95c4ef79edb7"></a><a
              id="t.0"></a>
          <table class="c19">
              <tbody>
                  <tr class="c16">
                      <td class="c2" colspan="1" rowspan="1">
                          <p class="c0"><span class="c3">Item</span></p>
                      </td>
                      <td class="c8" colspan="1" rowspan="1">
                          <p class="c0"><span class="c3">Price</span></p>
                      </td>
                  </tr>
                  <tr class="c14">
                      <td class="c2" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">Brooms and Dustbin</span></p>
                      </td>
                      <td class="c8" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">3.2$</span></p>
                      </td>
                  </tr>
                  <tr class="c13">
                      <td class="c2" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">Snow shovels</span></p>
                      </td>
                      <td class="c8" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">2.8$</span></p>
                      </td>
                  </tr>
                  <tr class="c9">
                      <td class="c2" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">Garbage and recycling container</span></p>
                      </td>
                      <td class="c8" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">1.6$</span></p>
                      </td>
                  </tr>
                  <tr class="c1">
                      <td class="c2" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">Light bulbs</span></p>
                          <p class="c0 c18"><span class="c6"></span></p>
                      </td>
                      <td class="c8" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">1$</span></p>
                      </td>
                  </tr>
                  <tr class="c1">
                      <td class="c2" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">Household Cleaners</span></p>
                      </td>
                      <td class="c8" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">2$</span></p>
                      </td>
                  </tr>
                  <tr class="c1">
                      <td class="c2" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">Furnace filters</span></p>
                      </td>
                      <td class="c8" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">3.4$</span></p>
                      </td>
                  </tr>
                  <tr class="c1">
                      <td class="c2" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">Screen door</span></p>
                      </td>
                      <td class="c8" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">1.5$</span></p>
                      </td>
                  </tr>
              </tbody>
          </table>
          <p class="c7"><span class="c15"></span></p>
          <p class="c7"><span class="c15"></span></p>
          <p class="c11"><span class="c15">Our Up-Sell Items </span></p>
          <p class="c12"><span class="c10"></span></p><a id="t.163f6a4f5a0985893cc85c3523c3e9a528780246"></a><a id="t.1"></a>
          <table class="c19">
              <tbody>
                  <tr class="c1">
                      <td class="c2" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">Simonize car cloths</span></p>
                      </td>
                      <td class="c8" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">1$</span></p>
                      </td>
                  </tr>
                  <tr class="c1">
                      <td class="c2" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">Geeky headlamps</span></p>
                      </td>
                      <td class="c8" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">5$</span></p>
                      </td>
                  </tr>
                  <tr class="c1">
                      <td class="c2" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">Ear buds</span></p>
                      </td>
                      <td class="c8" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">1$</span></p>
                      </td>
                  </tr>
                  <tr class="c1">
                      <td class="c2" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">De-scaler for a kettle</span></p>
                      </td>
                      <td class="c8" colspan="1" rowspan="1">
                          <p class="c0"><span class="c6">2$</span></p>
                      </td>
                  </tr>
              </tbody>
          </table>
          <p class="c12"><span class="c10"></span></p>
      </body>
      
      </html>     `);
  
    }
}
