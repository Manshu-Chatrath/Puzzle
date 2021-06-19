import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  totalmin=-1;
  totalsec=-1;
  limitationmin=0;
  limitationsec=0;
  firstprizemin=-1;
  firstprizesec=-1;
  secondprizemin=-1;
  secondprizesec=-1;
  thirdprizemin=-1;
  thirdprizesec=-1;
  mistake="";
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

setrules(userForm: any)
{let obj=userForm.value;
  let totaltime=this.totalmin*60+this.totalsec;
  let totalfirst=this.firstprizemin*60+this.firstprizesec;
  let totalsecond=this.secondprizemin*60+this.secondprizesec;
  let totalthird=this.thirdprizemin*60+this.thirdprizesec;
  obj.totalmin=this.totalmin;
  obj.totalsec=this.totalsec;
  obj.firstprizemin=this.firstprizemin;
  obj.firstprizesec=this.firstprizesec;
  obj.secondprizemin=this.secondprizemin;
  obj.secondprizesec=this.secondprizesec;
  obj.thirdprizemin=this.thirdprizemin;
  obj.thirdprizesec=this.thirdprizesec;
  obj.limitationmin=this.limitationmin;

 if(obj.img!="" && obj.totalmin!=-1 && obj.totalsec!=-1  && obj.firstprizemin !=-1 && obj.firstprizesec !=-1 && obj.secondprizemin !=-1 && obj.thirdprizemin !=-1 && obj.thirdprizesec !=-1 && obj.limitationmin !=0)
 {
  if(totalfirst>=totaltime)
  {
    this.mistake='Total time of first prize have to be less than total time!'
  }
 else if(totalsecond<=totalfirst)
  {
    this.mistake='Total time of second prize have to be more than that of first prize!';
  }
  else if(totalthird<=totalsecond)
  {
    this.mistake='Total time of third prize have to be more than that of second!';
  }
  else if(totalthird>totaltime)
  {
    this.mistake='Total time of third prize cannot be more than that of total time!'
  }
  else if(!/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/.test(obj.img))
  {
    this.mistake='Not a valid url!'
  }
  else
  { this.mistake='';
   this.http.put('https://puzzlebackend.herokuapp.com/setrules',obj).subscribe((response: any)=>{
    if(response)
    {
      window.location.href='https://real-puzzle.herokuapp.com/'
    }
   });
  }
 }
 else
 {  
   this.mistake='Please fill all the information!'
 }
}


  /* Logic to make buttons work */
  upgrade(e: Event)
  { let totalmin=document.getElementById('totalmin')! as HTMLInputElement;
    let totalsec=document.getElementById('totalsec')! as HTMLInputElement;  
    let limitationmin=document.getElementById('limitationmin')! as HTMLInputElement;
    let limitationsec=document.getElementById('limitationsec')! as HTMLInputElement;
    let firstprizemin=document.getElementById('firstprizemin')! as HTMLInputElement;
    let firstprizesec=document.getElementById('firstprizesec')! as HTMLInputElement;
    let secondprizemin=document.getElementById('secondprizemin')! as HTMLInputElement;
    let secondprizesec=document.getElementById('secondprizesec')! as HTMLInputElement;
    let thirdprizemin=document.getElementById('thirdprizemin')! as HTMLInputElement;
    let thirdprizesec=document.getElementById('thirdprizesec')! as HTMLInputElement;
    const target = e.target as HTMLInputElement;
  console.log(target.id);
    if(target.id==='totalmin-up')
    {
      this.totalmin++;
      if(this.totalmin<10)
      {
        totalmin.value=0+this.totalmin.toString();
      }
      else
      {
        totalmin.value=this.totalmin.toString();
      }
    }
    if(target.id==='totalmin-down')
    { 
      if(this.totalmin>0)
      {   this.totalmin--;
        if(this.totalmin<10)
        {
          totalmin.value=0+this.totalmin.toString();
        }
        else
        {
          totalmin.value=this.totalmin.toString();
        }
      }
    }
    if(target.id==='totalsec-up')
    { if(this.totalsec<59)
      {   this.totalsec++;
        if(this.totalsec<10)
        {
          totalsec.value=0+this.totalsec.toString(); 
        }
        else
        {
          totalsec.value=this.totalsec.toString();
        }
      } 
    }
    if(target.id==='totalsec-down')
    {
      if(this.totalsec>0)
      {
        this.totalsec--;
        if(this.totalsec<10)
        {
          totalsec.value=0+this.totalsec.toString();
        } 
        else
        {
          totalsec.value=this.totalsec.toString();
        }
      }
    }
    if(target.id==='limitationup-min')
    { this.limitationmin++;
      limitationsec.value=0+this.limitationsec.toString(); 
      if(this.limitationmin<10)
      {
        limitationmin.value=0+this.limitationmin.toString();
      }
      else
      {
        limitationmin.value=this.limitationmin.toString();
      }

    }
    if(target.id==='limitationdn-min')
    { 
      if(this.limitationmin>1)
      {this.limitationmin--;
        limitationsec.value=0+this.limitationsec.toString(); 
        if(this.limitationmin<10)
        {
          limitationmin.value=0+this.limitationmin.toString();
        }
        else
        {
          limitationmin.value=this.limitationmin.toString();
        }
      }
    }
    if(target.id==='firstprizemin-up')
    {this.firstprizemin++;
      if(this.firstprizemin<10)
      { 
        firstprizemin.value=0+this.firstprizemin.toString();
      }
      else
      {
        firstprizemin.value=this.firstprizemin.toString();
      }
    }
    if(target.id==='firstprizemin-dwn')
    {  if(this.firstprizemin>0)
      {   this.firstprizemin--;
        if(this.firstprizemin<10)
        {
          firstprizemin.value=0+this.firstprizemin.toString();
        }
        else
        {
          firstprizemin.value=this.firstprizemin.toString();
        }
      }
    }
    if(target.id==='firstprizesec-up')
    {this.firstprizesec++;
      if(this.firstprizesec<59)
      {
        if(this.firstprizesec<10)
        { 
          firstprizesec.value=0+this.firstprizesec.toString();
        }
        else
        {
          firstprizesec.value=this.firstprizesec.toString();
        }
      }
    }
  
    if(target.id==='firstprizesec-dwn')
    {  if(this.firstprizesec>0)
      {   this.firstprizesec--;
        if(this.firstprizesec<10)
        {
          firstprizesec.value=0+this.firstprizesec.toString();
        }
        else
        {
          firstprizesec.value=this.firstprizesec.toString();
        }
      }
    }
    if(target.id==='secondprizemin-up')
    {this.secondprizemin++;
      if(this.secondprizemin<10)
      { 
        secondprizemin.value=0+this.secondprizemin.toString();
      }
      else
      {
        secondprizemin.value=this.secondprizemin.toString();
      }
    }
    if(target.id==='secondprizemin-dwn')
    {  if(this.secondprizemin>0)
      {   this.secondprizemin--;
        if(this.secondprizemin<10)
        {
          secondprizemin.value=0+this.secondprizemin.toString();
        }
        else
        {
          secondprizemin.value=this.secondprizemin.toString();
        }
      }
    }
    if(target.id==='secondprizesec-up')
    {this.secondprizesec++;
      if(this.secondprizesec<59)
      {
        if(this.secondprizesec<10)
        { 
          secondprizesec.value=0+this.secondprizesec.toString();
        }
        else
        {
          secondprizesec.value=this.secondprizesec.toString();
        }
      }
    }
    if(target.id==='secondprizesec-dwn')
    {  if(this.secondprizesec>0)
      {   this.secondprizesec--;
        if(this.secondprizesec<10)
        {
          secondprizesec.value=0+this.secondprizesec.toString();
        }
        else
        {
          secondprizesec.value=this.secondprizesec.toString();
        }
      }
    }
    if(target.id==='thirdprizemin-up')
    {this.thirdprizemin++;
      if(this.thirdprizemin<10)
      { 
        thirdprizemin.value=0+this.thirdprizemin.toString();
      }
      else
      {
        thirdprizemin.value=this.thirdprizemin.toString();
      }
    }
    if(target.id==='thirdprizemin-dwn')
    { 
       if(this.thirdprizemin>0)
      {   this.thirdprizemin--;
        if(this.thirdprizemin<10)
        {
          thirdprizemin.value=0+this.thirdprizemin.toString();
        }
        else
        {
          thirdprizemin.value=this.thirdprizemin.toString();
        }
      }
    }
    if(target.id==='thirdprizesec-up')
    {this.thirdprizesec++;
      if(this.thirdprizesec<59)
      {
        if(this.thirdprizesec<10)
        { 
          thirdprizesec.value=0+this.thirdprizesec.toString();
        }
        else
        {
          thirdprizesec.value=this.thirdprizesec.toString();
        }
      }

    }
    if(target.id==='thirdprizesec-dwn')
    {  if(this.thirdprizesec>0)
      {   this.thirdprizesec--;
        if(this.thirdprizesec<10)
        {
          thirdprizesec.value=0+this.thirdprizesec.toString();
        }
        else
        {
          thirdprizesec.value=this.thirdprizesec.toString();
        }
      }
    }
  }

}
