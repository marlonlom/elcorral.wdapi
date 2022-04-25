/* build foods category list */
var foodCategories=[];
var foodGroups=document.querySelectorAll('.accordion > li'); 
foodGroups.forEach(group => {
  const groupId = group.id;
  if (groupId !== '') {
    const groupKey = groupId.substr(groupId.lastIndexOf('_')+1);
    foodCategories.push({
      id: groupKey.trim(),
      title: group.querySelector('div > img').title.trim()
    });
  }
});
console.info(JSON.stringify(foodCategories));

