const fs = require('fs')
const path = require('path')



// Get Main page
// Route GET /
// Access Public
const getMainPage = (req,res)=>{
    const database =  fs.readFileSync(path.join(__dirname, '..', '/database', 'data.json'), 'utf-8',(err)=>{
        if (err) throw new err
    }) 
    
    res.render('books/books',{
     title: 'Books',
     data: JSON.parse(database)
    })


}

const deleteBooks = (req,res)=>{
    function deleteData(id) {
        // Read the JSON file
        const jsonData =  fs.readFileSync(path.join(__dirname, '..', '/database', 'data.json'), 'utf-8',(err)=>{
            if (err) throw new err
        }) 
      
        // Parse the JSON data
        const data = JSON.parse(jsonData);
      
        // Find the index of the data to delete
        const index = data.findIndex(item => item.id === id);
      
        // Check if the data exists
        if (index !== -1) {
          // Remove the data from the array
          data.splice(index, 1);
      
          // Convert the data back to JSON
          const updatedData = JSON.stringify(data, null, 2);
      
           // Write the updated data back to the file
           fs.writeFileSync('data.json', updatedData);
      
          return true; // Return true if data is deleted successfully
        }
      
         return false; // Return false if data does not exist
    }
      
    const deleted = deleteData(1);
    if (deleted) {
        console.log('Data deleted successfully');
    } else {
        console.log('Data not found');
    }

    res.redirect('/')
    
}

const updatedBooks = (req,res)=>{
    function updateDataInJsonFile(filePath, newData) {
        // Read the JSON file and parse its contents into a JavaScript object
        const jsonData = JSON.parse(fs.readFileSync(filePath));
      
        // Modify the necessary data in the JavaScript object
        // For example, let's update a property called 'name'
        jsonData.name = newData;
      
        // Convert the JavaScript object back into a JSON string
        const updatedJsonData = JSON.stringify(jsonData, null, 2);
      
        // Write the updated JSON string back to the file
        fs.writeFileSync(filePath, updatedJsonData);
      
        console.log('Data updated successfully!');
      }

      const filePath = path.join(__dirname, '..', '/database', 'data.json');
      const newData =  {
        "id": 3,
        "title": "Sarob",
        "autor": "Abdulla Qaxxor"
      }

      updateDataInJsonFile(filePath, newData);

res.redirect('/')
}

module.exports = {
    getMainPage,
    deleteBooks, 
    updatedBooks
}