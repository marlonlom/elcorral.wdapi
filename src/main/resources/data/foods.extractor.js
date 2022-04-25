/* build foods by category object */
var foodsByGroup={};
var foodGroups=document.querySelectorAll('.accordion > li'); 
foodGroups.forEach(group => {
  const groupId = group.id;
  if (groupId !== '') {
    const groupKey = groupId.substr(groupId.lastIndexOf('_')+1);
    foodsByGroup[groupKey]=[];
    const foodRows = group.querySelectorAll('.submenu > div');
    foodRows.forEach(itm=>{
      const itemId=itm.id;
      if (itemId !== '') {
        foodsByGroup[groupKey].push({
          id:itemId.substr(itemId.lastIndexOf('_')+1).trim(),
          title: itm.querySelector('div.col-xs-6>h3').innerText.trim(),
          description: itm.querySelector('div.col-xs-6>span').innerText.trim(),
          priceText: `COP ${itm.querySelector('div.col-xs-12>h3').innerText.trim()}`,
          priceNumber: Number(itm.querySelector('div.col-xs-12>h3').innerText.replace('$','').replace(',','').trim())
        });
      }
    });
  }
});
console.info(foodsByGroup);
console.info(JSON.stringify(foodsByGroup));

