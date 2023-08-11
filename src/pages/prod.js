import React from "react";

import { Rate } from 'antd';

import Nav from "../components/nav";
import Footer from "../components/footer";

const ProdDetail = () => {
    return (
        <div className="new-product-page">
            <Nav />
            <div className="product-data-display">
                <div>
                    <h2>Dancerapy Club Annual Online Subscription</h2>
                    <p>Join The Dancerapy Club Today and have access to over 30 Dance Fitness Videos, Dance
                        Choreophgries, Dance Trends and lots more monthly. For ONLY 20 thousand naira per Year</p>
                    <div className="price-prod-data">
                        <div className="grid-3">
                            <div className="price-tab">
                                <div className="price-tab-header">
                                    <h5>3 Months</h5>
                                </div>
                                <div className="price-tab-body">
                                    <h2><span className="currency">NGN</span> 8,000.00</h2>
                                    <button className="btn-red">Subscribe Now</button>
                                </div>
                            </div>
                            <div className="price-tab">
                                <div className="price-tab-header active-tab">
                                    <h5>Monthly</h5>
                                </div>
                                <div className="price-tab-body">
                                    <h2><span className="currency">NGN</span> 3,000.00</h2>
                                    <button className="btn-red">Subscribe Now</button>
                                </div>
                                <div className="linen-cover">
                                    <div className="linen-header">
                                        <p>Most Popular</p>
                                    </div>
                                </div>
                            </div>
                            <div className="price-tab">
                                <div className="price-tab-header">
                                    <h5>Annual</h5>
                                </div>
                                <div className="price-tab-body">
                                    <h2><span className="currency">NGN</span> 20,000.00</h2>
                                    <button className="btn-red">Subscribe Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>
                        <small>*Billed as one payment. Subscription renews automatically at the end of term. You can turn
                            off auto-renew from your settings. Learn more here.</small>
                    </p>
                </div>
            </div>
            <div className="testimonial-messages mt-5">
                <div className="contain">
                    <div className="grid-3">
                        <div>
                            <Rate disabled allowHalf defaultValue={5} />
                            <p>"It’s perfect for everyone - I started on the free version and loved it, so I sent it to my 14
                                year old son, and his improvement in math was amazing in just 2 weeks!"</p>
                            <p>&mdash; William Clements</p>
                        </div>
                        <div>
                            <Rate disabled allowHalf defaultValue={5} />
                            <p>"It’s perfect for everyone - I started on the free version and loved it, so I sent it to my 14
                                year old son, and his improvement in math was amazing in just 2 weeks!"</p>
                            <p>&mdash; William Clements</p>
                        </div>
                        <div>
                            <Rate disabled allowHalf defaultValue={5} />
                            <p>"It’s perfect for everyone - I started on the free version and loved it, so I sent it to my 14
                                year old son, and his improvement in math was amazing in just 2 weeks!"</p>
                            <p>&mdash; William Clements</p>
                        </div>
                        <div>
                            <Rate disabled allowHalf defaultValue={5} />
                            <p>"It’s perfect for everyone - I started on the free version and loved it, so I sent it to my 14
                                year old son, and his improvement in math was amazing in just 2 weeks!"</p>
                            <p>&mdash; William Clements</p>
                        </div>
                        <div>
                            <Rate disabled allowHalf defaultValue={5} />
                            <p>"It’s perfect for everyone - I started on the free version and loved it, so I sent it to my 14
                                year old son, and his improvement in math was amazing in just 2 weeks!"</p>
                            <p>&mdash; William Clements</p>
                        </div>
                        <div>
                            <Rate disabled allowHalf defaultValue={5} />
                            <p>"It’s perfect for everyone - I started on the free version and loved it, so I sent it to my 14
                                year old son, and his improvement in math was amazing in just 2 weeks!"</p>
                            <p>&mdash; William Clements</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProdDetail;