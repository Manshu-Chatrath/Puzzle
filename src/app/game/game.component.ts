import { Component, OnInit } from '@angular/core';
import { RulesService } from '../rules.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  constructor(private rules: RulesService) {}
  data: any[]=[];
  startingmin=0;
  startingsec=0;
  limitation=0;
  firstmin=0;
  secondmin=0;
  thirdmin=0;
  secondsec=0;
  thirdsec=0;
  firstsec=0;
  mistake='';
  prize=0;
  loading='';
  adduser(userForm: any)
  { 
    let obj=userForm.value;
    if(obj.email !="" && obj.name !="" && obj.contact !="")
    {
      if(obj.contact.length===10)
      {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(obj.email))
        { this.mistake='';
          this.rules.personalinfo(obj).subscribe((response: any)=>{
            this.loading=response.message;
            let form=document.querySelector('.for')!;
            form.innerHTML="";
            form.classList.add('visible');
            setTimeout(() => {
              location.reload();
            }, 3000);
          });
        }
        else
        {
          this.mistake='Your email address is not valid.'
        }

      }
      else
      {
        this.mistake='Your contact number is not valid.'
      }
    }
    else
    {
      this.mistake='Please fill all the information.'
    }

  }
  ngOnInit(): void {
    this.rules.getinfo().subscribe((response: any)=>{
      this.data.push(response.data);
      let image=document.getElementById('board')!;

      image.style.backgroundImage=`url(${this.data[0][0].img})`;
      this.startingmin=this.data[0][0].ml;
      this.startingsec=this.data[0][0].ms;
      this.limitation=this.data[0][0].limitation;
      this.firstmin=this.data[0][0].firstmin
      this.secondmin=this.data[0][0].secondmin;
      this.thirdmin=this.data[0][0].thirdmin;
      this.secondsec=this.data[0][0].secondsec;
      this.thirdsec=this.data[0][0].thirdsec;
      this.firstsec=this.data[0][0].firstsec;
    })
  }
  close()
  {
    document.querySelector('.modal3')!.classList.add('visible');
  }
  reset()
  {  (<HTMLInputElement> document.querySelector(".start")).disabled = false;
    let overlay=document.getElementById('overlay')!; 
    let fail=document.querySelector('.modal2')!;
    fail.classList.add('visible');
    overlay.classList.add('hide');
    document.getElementById('board')!.innerHTML="";
  }
  restart()
  {
  let min=this.limitation;
  let sec=0;
  let minutes=document.querySelector('.minutes2')!;
  let seconds=document.querySelector('.seconds2')!;
  let stop=setInterval(function(){
    sec--;
if(sec<0)
{
  sec=60;
  sec--;
  min--;
  minutes.innerHTML='0'+min.toString();
}
seconds.innerHTML=sec.toString();  
if(sec<10)
{
  seconds.innerHTML='0'+sec.toString();
}
if(min===0 && sec===0)
{ clearInterval(stop);
  seconds.innerHTML='0'+sec.toString();
  minutes.innerHTML='0'+min.toString();
  (<HTMLInputElement> document.querySelector(".submit33")).disabled = false;
}
},1000)
  }
  run(row: number,column: number) : any
  {
  var cell = document.getElementById("cell"+row+column)!;
  var tile = cell.className;
  if (tile!="tile11") { 
       //Checking if white tile on the right
       if (column<3) {
         if ( document.getElementById("cell"+row+(column+1))!.className=="tile11") {
  
          this.swapTiles("cell"+row+column,"cell"+row+(column+1));
          return ;
         }
       }
       //Checking if white tile on the left
       if (column>1) {
         if ( document.getElementById("cell"+row+(column-1))!.className=="tile11") {
           this.swapTiles("cell"+row+column,"cell"+row+(column-1));
           return ;
         }
       }
         //Checking if white tile is above
       if (row>1) {
         if ( document.getElementById("cell"+(row-1)+column)!.className=="tile11") {
           this.swapTiles("cell"+row+column,"cell"+(row-1)+column);
           return ;
         }
       }
       //Checking if white tile is below
       if (row<3) {
         if (document.getElementById("cell"+(row+1)+column)!.className=="tile11") {
           this.swapTiles("cell"+row+column,"cell"+(row+1)+column);
           return ;
         }
       } 
  }
  }
  swapTiles(cell1: string, cell2: string)
  {
    var temp = document.querySelector(`#${cell1}`)!.className!;
    document.querySelector(`#${cell1}`)!.className = document.getElementById(cell2)!.className;
    document.getElementById(cell2)!.className = temp;
  }
  shuffle()
  {
    for (var row=1;row<=3;row++) { 
      for (var column=1;column<=3;column++) { 
       var row2=Math.floor(Math.random()*3 + 1); 
       var column2=Math.floor(Math.random()*3 + 1); 
       this.swapTiles("cell"+row+column,"cell"+row2+column2); 
     } 
   } 
  }
onstart(event: Event){
  (<HTMLInputElement> document.querySelector(".start")).disabled = true;
  let overlay=document.getElementById('overlay')!; 
  overlay.classList.remove('hide');
  let minutes=document.querySelector('.minutes')!;
  let seconds=document.querySelector('.seconds')!;
  let min=this.startingmin;
  let sec=this.startingsec;
  
  let stop=setInterval(()=>{
    sec--;
    if(document.getElementById('cell11')!.className=='tile11' && document.getElementById('cell12')!.className=='tile12' && document.getElementById('cell13')!.className=='tile13' && document.getElementById('cell21')!.className=='tile21' &&  document.getElementById('cell22')!.className=='tile22' &&  document.getElementById('cell23')!.className=='tile23' &&  document.getElementById('cell31')!.className=='tile31' &&  document.getElementById('cell32')!.className=='tile32' &&  document.getElementById('cell33')!.className=='tile33')
    {clearInterval(stop);
      if(min<=this.firstmin && sec<=this.firstsec)
      {
        this.prize=50;
      }
      else if(min<=this.secondmin && sec<=this.secondsec)
      {
        this.prize=10;
      }
      else if(min<=this.thirdmin && sec<=this.thirdsec)
      {
        this.prize=5;
      }
      else
      {
        this.prize=0;
      }
      success.classList.remove('visible');
    }
    
if(sec<0)
{
  sec=60;
  sec--;
  min--;
}
minutes.innerHTML=min.toString();
seconds.innerHTML=sec.toString();  
if(sec<10)
{
  seconds.innerHTML='0'+sec.toString();
}
  if(min<10)
  {
    minutes.innerHTML='0'+min.toString();
  }
if(min===0 && sec===0)
{ clearInterval(stop);
  seconds.innerHTML='0'+sec.toString();
  minutes.innerHTML='0'+min.toString();
  fail.classList.remove('visible');
  (<HTMLInputElement> document.querySelector(".submit33")).disabled = true;
  this.restart();
}
},1000)

let success=document.querySelector('.modal1')!;
let fail=document.querySelector('.modal2')!;
let board=document.getElementById('board')!;
let horizontalvalue=board.offsetHeight/3;
console.log(horizontalvalue);
let verticalvalue=horizontalvalue;
for(let i=1,vertical=0;i<4;i++,vertical-=verticalvalue)
{  
    for(let j=1,horizontal=0;j<4;j++,horizontal-=horizontalvalue)
    {   let a='tile'+i+j;
        let enemy=document.createElement("div");
        var style = document.createElement('style');
        enemy.style.top=-(vertical)+'px';
        enemy.style.left=-(horizontal)+'px'
        style.innerHTML = `.${a} { background: url(${this.data[0][0].img});  background-position: ${horizontal}px ${vertical}px;}`;
        if(i===1 && j===1)
        {
         style.innerHTML = `.${a} {display: none; opacity: 0.1; background-position: ${horizontal}px ${vertical}px;}`;  
        }
        document.getElementsByTagName('head')[0].appendChild(style);
        let b='cell'+i+j;
        enemy.setAttribute('id',b);
        enemy.classList.add(a);
        enemy.addEventListener('click',()=>this.run(i,j));
        document.getElementById('board')!.appendChild(enemy);
      }
}
this.shuffle();
}
}
