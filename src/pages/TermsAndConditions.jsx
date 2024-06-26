import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';

const TermsAndConditions = () => {
  return (
    <div>
      <Meta title={"Terms & Conditions"}></Meta>
      <BreadCrumb title="Terms & Conditions"></BreadCrumb>
      <Container className="policy-wrapper py-5 home-wrapper-2">
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

export default TermsAndConditions