# Gson/ Json serialize & deserialize

## Overview:
- Gson.fromJson() convert String (json format) > JsonElement > Java Object
- Gson.toJson() convert Java Object > JsonElement > String (json format) 
- JsonElement is intermediate temp. object
- TypeAdapter is more efficient cause it skipping intermediate layer
    - only need to implement read() and write() methods
- 

## References:
- Simple usage (Object-to-String and String-to-Object): http://www.javacreed.com/simple-gson-example/
- JsonSerializer (Object-to-JsonElement): http://www.javacreed.com/gson-serialiser-example/
- JsonDeserializer (JsonElement-to-Object): http://www.javacreed.com/gson-deserialiser-example/
- Using TypeAdapter (more efficient than JsonSerializer & JsonDeserializer): http://www.javacreed.com/gson-typeadapter-example/
