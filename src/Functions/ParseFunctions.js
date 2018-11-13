const Parse = require('parse/react-native')

const CreateParseObject = (ClassName, ID) => {
    return Parse.Object.fromJSON({
        className: ClassName,
        objectId: ID
    })
}

export {
    CreateParseObject
}