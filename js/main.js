var dragdrop={
    item:null,
    init:function(){
        document.addEventListener('dragover', this.dragOver.bind(this), false);
        document.addEventListener('dragstart', this.dragStart.bind(this), false);
        document.addEventListener('drop', this.drop.bind(this), false);
        document.addEventListener('dragend',this.dragEnd.bind(this),false);
        this.loadData();
    },
    dragOver:function(e)
    {
        if(this.item)
        {
            e.preventDefault();
        }
    
    },
    dragStart:function (e)
    {
        this.item = e.target;
        e.dataTransfer.setData('text', '');
    
    },
    drop:function(e)
    {
        var targetElement= e.target,
        self=this,
        targetItem= this.item.parentElement;
        if(e.target.getAttribute('data-draglist') == 'dropZone')
        {
            
            if((this.item.parentElement.id == "list2" && targetElement.id== "list1") ||
            (this.item.parentElement.id == "list4" && targetElement.id== "list3") ){
                targetElement.appendChild(this.item);
                 e.preventDefault();
            }
           
            if(self.comparelist()){
                targetElement.removeChild(targetElement.lastChild);
                targetItem.append(this.item);
            }
        }
    
    },
    dragEnd:function(e)
    {
        this.item = null;
    
    },
    
    html:function(data){
        var self=this,
        element = document.querySelectorAll('.draglists'),
         key= Object.keys(data);

        for(var i=1;i <4; i=i+2){
            key.forEach(function(el){
                var li= document.createElement('li');
                self.setAttributes(li,{'data-draglist':'item','draggable': 'true'})
                element[i].appendChild(li);
                return li.innerHTML= data[el];
            })
        }
    },

    setAttributes:function(el, attrs) {
      for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
      }
    },
    
    comparelist:function(){
        var list1 = document.querySelectorAll('#list1 li'),
            list3=document.querySelectorAll('#list3 li'),
            arr=[],array=[];
            list1.forEach(el=>{
                 arr.push(el.innerHTML);
            })
            list3.forEach(el=>{
                array.push(el.innerHTML);
            })
            return JSON.stringify(arr.sort()) == JSON.stringify(array.sort());
    },
    loadData:function(){
        var self = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange=function() {
          if (this.readyState == 4 && this.status == 200) {
            self.html(JSON.parse(this.responseText));
          }
        };
        xhttp.open("GET", "../data/data.json", true);
        xhttp.send();
    }

}

dragdrop.init();
