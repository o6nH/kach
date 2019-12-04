import Router from './Router';
import {connect} from 'react-redux';
import {fetchAndCategorizeProducts, getCurrentUser} from './actions';

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getCurrentUser()),
  getAllProducts: () => dispatch(fetchAndCategorizeProducts())
});

export default connect(null, mapDispatchToProps)(Router);