import React,{useState} from "react";

import { connect } from "react-redux";

function Recherche({
  products: { category },
  handelRecherche,
  setformvValue,
  formvValue,
}) {
  let [inputRecherche , setinputRecherche] = useState({
    productName:"",
    category:"",
    price:""
  });
  const handelchangevalue = (event) => {
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
                        onChange={handelchangevalue}
                        className="form-control"
                        id="productName"
                        name="productName"
                        type="text"
                        defaultValue={inputRecherche.productName}
                        placeholder="Nom"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="category">Catégorie</label>
                      <select
                        onChange={handelchangevalue}
                        className="form-control"
                        id="category"
                        name="category"
                        defaultValue={inputRecherche.category}
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
                        onChange={handelchangevalue}
                        className="form-control"
                        id="price"
                        name="price"
                        type="number"
                        defaultValue={inputRecherche.price}
                        placeholder="00"
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-warning mb-3 float-right"
                  type="submit"
                >
                  Rechercher
                  <i className="fa fa-spinner fa-spin"></i>
                </button>
                <button
                  className="btn btn-danger mb-3 float-right"
                  type="reset"
                  onClick={() => setformvValue({})}
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
  product: state.product,
});
export default connect(mapStatToProps, null)(Recherche);
