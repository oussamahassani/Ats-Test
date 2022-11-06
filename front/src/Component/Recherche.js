import React,{useState} from "react";

import { connect } from "react-redux";
import { getProducts } from "../actions/ProductService";

function Recherche({
  products: { category },
  handelRecherche,
  setformvValue,
  formvValue,
  getProducts,
  setFormData
}) {
  let [inputRecherche , setinputRecherche] = useState({
    productName: formvValue && formvValue.productName ? formvValue.productName : "",
    category:formvValue && formvValue.category ? formvValue.category : "",
    price:formvValue && formvValue.price ? formvValue.price : ""
  });

  const handelChangeValue = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setinputRecherche({ ...inputRecherche, [name]: value })
    if (value.replace(" ", "") !== "")
      setformvValue({ ...formvValue, [name]: value });
    else {
      delete formvValue[name];
      setformvValue({ ...formvValue });
    }
  };

  const resetRecherche = () => {
    getProducts(0, null);
    setformvValue({})
    setFormData(1)
  }
  return (
    <div>
      <div className="card mb-3">
        <div className="card-header">
          <h5 className="mb-0">Recherche produit</h5>
        </div>
        <div className="card-body bg-light">
          <div className="row">
            <div className="col-12">
              <form onSubmit={handelRecherche}>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="productName">Nom</label>
                      <input
                        onChange={handelChangeValue}
                        className="form-control"
                        id="productName"
                        name="productName"
                        type="text"
                        value={inputRecherche.productName}
                        placeholder="Nom"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="category">Catégorie</label>
                      <select
                        onChange={handelChangeValue}
                        className="form-control"
                        id="category"
                        name="category"
                        value={inputRecherche.category}
                      >
                        <option value="">selectioner votre category</option>
                        {category.map((el, index) => {
                          return (
                            <option key={index} value={el}>
                              {el}
                            </option>
                          );
                        })}
                      </select>
                      <i className="fa fa-spinner fa-spin"></i>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="price">Prix</label>
                      <input
                        onChange={handelChangeValue}
                        className="form-control"
                        id="price"
                        name="price"
                        type="number"
                        value={inputRecherche.price}
                        placeholder="00"
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-warning mb-3 float-right ml-1"
                  type="submit"
                >
                  Rechercher
                  <i className="fa fa-spinner fa-spin"></i>
                </button>
                <button
                  className="btn btn-danger mb-3 float-right"
                  type="reset"
                  onClick={() =>resetRecherche() }
                >
                  Réinitialiser
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStatToProps = (state) => ({
  products: state.products,
});
export default connect(mapStatToProps, {getProducts})(Recherche);
