import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';

const RefundPolicy = () => {
  return (
    <div>
        <Meta title={"Refund Policy"}></Meta>
        <BreadCrumb title="Refund Policy"></BreadCrumb>
        <Container class1="policy-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="policy">
                        
                    </div>
                </div>
            </div>
      </Container>
    
    </div>
  )
}

export default RefundPolicy