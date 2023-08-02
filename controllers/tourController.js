const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    // build the query
    //1-> Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 2-> Advanced Filtering
    const queryStr = JSON.stringify(queryObj);
    queryStr.replace();

    const query = await Tour.find(queryObj);

    // execute the query
    const tours = await query;

    //send the response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        data: tour
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    //const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: newTour
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200),
      json({
        status: 'success',
        data: {
          data: tour
        }
      });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'sucess',
      data: null
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error
    });
  }
};
