var mongoose = require('mongoose');

exports._get = async (model, projection = {}, selection = {}, options = {}) => {

    try {
        const query = model.find(projection);

        if (options.populate) query.populate(options.populate);

        if (options.sort) query.sort(options.sort)

        if (options.skip) query.skip(options.skip);

        if (options.limit) query.limit(options.limit);

        query.select(selection);

        const response = await query;

        return response;

    } catch (err) {

    }


}


exports._store = async (model, document, options = {}) => {

    try {
        const query = new model(document)

        const response = await query.save();

        return response;

    } catch (err) {
        console.log(err);
    }

}


exports._find = async (model, projection = {}, selection = {}, options = {}) => {

    try {
        var query =  model.findOne(projection);

        //if (options.populate) query.populate([{path: 'user', select: 'name -_id', populate: { path: 'country' } } ]);
        query.populate({path: 'user'}).populate({ path: 'country' });
        const response = await query;

        return response;

    } catch (err) {

    }
}


exports._update = async (model, condition = {}, document, options = {}) => {
    try {

        const query = await model.findOneAndUpdate(condition, document, { new: true });
console.log(query);
        return true;

    } catch (err) {

    }

}


exports._delete = async (model, condition = {}, options = {}) => {

    try {

        const query = await model.findOneAndDelete(condition);

        return query;
    } catch (err) {

    }

}


exports._deleteAll = async (model, condition = {}, options = {}) => {
    try {
        const query = model.deleteMany(condition);

        return true;
    } catch (err) {

    }
}


exports._count = async (model, condition = {}, options = {}) => {
    try {
        const query = model.countDocuments(condition);

        return query;
    } catch (err) {

    }
}