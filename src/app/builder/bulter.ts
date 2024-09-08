const queryObj = { ...this.query }; // copy

// Filtering
const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

excludeFields.forEach((el) => delete queryObj[el]);
