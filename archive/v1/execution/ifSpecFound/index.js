const startFunc = ({ inSource, inTransform, inExecute }) => {
    const localSource = inSource;
    const localTransform = inTransform;
    const localExecute = inExecute;

    // console.log("localSource : ", localSource,);
    // console.log("localTransform : ", localTransform);

    const newElement = {};

    for (let [key, value] of Object.entries(localTransform)) {
        console.log("aaaaaaaaa : ", key);

    };

    return newElement;
};

export default startFunc;
