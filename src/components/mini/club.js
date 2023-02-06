import React from "react";

import { Input, Divider, Rate } from 'antd';

import { Link } from "react-router-dom";

import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Event1 from "../../assets/images/content/event_1.jpg";
import Event2 from "../../assets/images/homepage/link3.jpeg";
import Event3 from "../../assets/images/content/event3.jpg";
import Event4 from "../../assets/images/content/event4.jpg";

import _1 from '../../assets/images/companies/access.webp';
import _2 from '../../assets/images/companies/shell.png';
import _3 from '../../assets/images/companies/terra.png';
import _4 from '../../assets/images/companies/corona.png';
import _6 from '../../assets/images/companies/dansol.png';
import _7 from '../../assets/images/companies/gtco.png';
import _8 from '../../assets/images/companies/mtn.png';
import Footer from "../../utils/footer";
import Nav from "../../utils/nav";

const Corporate = () => {
    // const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;

    const signupValidator = yup.object().shape({
        emailAddress: yup.string().email('Please enter a valid email address').required('Please enter your email address'),
        password: yup.string().required('Please enter your password'),
        firstName: yup.string().required('Please enter your first name'),
        lastName: yup.string().required('Please enter your last name')
    })

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(signupValidator)
    });

    const signUpUser = e => {

    }
    return (
        <div>
            <Nav />
            <div className="corporate_grid_4 pt-5">
                <div className="contain">
                    <div className="grid_4">
                        <img src={Event1} alt='banner 1' />
                        <img src={Event2} alt='banner 1' />
                        <img src={Event3} alt='banner 1' />
                        <img src={Event4} alt='banner 1' />
                    </div>
                </div>
            </div>
            <div className="mt-5 instructor_div_bg corporate">
                <div className="white_instructor_prop">
                    <h2>Strength, Courage, Vitality</h2>
                    <p>
                        Dancing imbibes a sense of well-being quite unlike any other exercise. It is good for your heart and
                        makes you fit, helping you burn calories. Above all, you feel
                        light hearted and happy for no reason!
                    </p>
                    <p>
                        Dancerapy is a fitness and lifestyle brand invested in reintroducing dance as a choice therapy
                        for healthy living. As a movement, Dancerapy personalizes the idea of dance as a culture
                        towards achieving wholeness in health and fitness.
                    </p>
                    <p>
                        Dancerapy’s long-term vision is to inspire our community
                        with non-competitive dance education and offer many performance
                        opportunities in a facility that will motivate, educate,
                        and develop an appreciation of the fine arts.

                        Dancerapy…”Where Dancing Dreams Come True!”
                    </p>
                </div>
            </div>
            <div className="gray_bg">

            </div>
            <div className="sec_gray">
                <div className="sec_gray_content">
                    <div className="container">
                        <div className="instructor_form_div">
                            <div className="center_div">
                                <div>
                                    <h3 className="tile_header">Let us feature at your Organization</h3>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(signUpUser)}>
                                <div className="form-group space">
                                    <label htmlFor="firstName">Full Name</label>
                                    <Controller name="firstName" control={control}
                                        render={({ field }) => {
                                            return (
                                                <Input style={{ height: '5rem' }} type="text" {...field}
                                                    name="firstName" />
                                            )
                                        }} />
                                    {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                                </div>
                                <div className="form-group space">
                                    <label htmlFor="firstName">Organization Name</label>
                                    <Controller name="firstName" control={control}
                                        render={({ field }) => {
                                            return (
                                                <Input style={{ height: '5rem' }} type="text" {...field}
                                                    name="firstName" />
                                            )
                                        }} />
                                    {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                                </div>
                                <div className="form_flex">
                                    <div className="form-group">
                                        <label htmlFor="emailAddress">Email address</label>
                                        <Controller name="emailAddress" control={control}
                                            render={({ field }) => {
                                                return (
                                                    <Input style={{ height: '5rem' }} type="email" {...field}
                                                        name="emailAddress" />
                                                )
                                            }} />
                                        {errors.emailAddress && <p className="errorMessage">{errors.emailAddress.message}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="emailAddress">Phone number</label>
                                        <Controller name="emailAddress" control={control}
                                            render={({ field }) => {
                                                return (
                                                    <Input style={{ height: '5rem' }} type="tel" {...field}
                                                        name="emailAddress" />
                                                )
                                            }} />
                                        {errors.phoneNumber && <p className="errorMessage">{errors.phoneNumber.message}</p>}
                                    </div>
                                </div>
                                <button className="btn_red">Reach out to Us</button>
                            </form>
                        </div>
                    </div>
                    {/* <div className="mt-5 sec_content_box">
                        <div className="main_img">

                        </div>
                        <div className="main_text">
                            <div className="main_text_div">
                                <h3>
                                    Wasoko (formerly Sokowatch) is leveraging e-commerce to revamp Africa’s informal retail supply chain</h3>
                                <p>The company enables retailers to digitally order goods for quick delivery, powered by partnerships with
                                    FMCG manufacturers, and has added on credit offerings to further serve its customers.</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="mt-5 instructor_testimonials">
                <div className="container">
                    <div className="center_div">
                        <div>
                            <h3 className="tile_header">What our Clients are saying about Us</h3>
                            <ul>
                                <li><img src={_1} alt="" /></li>
                                <li><img src={_2} alt="" /></li>
                                <li><img src={_3} alt="" /></li>
                                <li><img src={_4} alt="" /></li>
                                <li><img src={_6} alt="" /></li>
                                <li><img src={_7} alt="" /></li>
                                <li><img src={_8} alt="" /></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-3 grid_3">
                        <div className="instructor_message_div">
                            <Rate disabled defaultValue={5} />
                            <p className="instructor_message">
                                Dancerapy is intense, fun, energetic and all the great words. If you are not a
                                dancerapy member, you are missing out big time. Shake your body, burn those
                                calories in a FUN way!
                            </p>
                            <div>
                                <p className="instructor_name">Chiamaka Obuekwe</p>
                            </div>
                        </div>
                        <div className="instructor_message_div">
                            <Rate disabled defaultValue={5} />
                            <p className="instructor_message">
                                With Dancerapy, i lost 8kg in four(4) months! It is always great fun during
                                Dancerapy sessions. You can dance your way to fitness, it is not a fluke.
                            </p>
                            <div>
                                <p className="instructor_name">Mrs Onyinye</p>
                            </div>
                        </div>
                        <div className="instructor_message_div">
                            <Rate disabled defaultValue={5} />
                            <p className="instructor_message">
                                Fun and energetic class, amazing instructors, great
                                engagements, beautiful members all of this and more to expect from a
                                Dancerapy session.
                            </p>
                            <div>
                                <p className="instructor_name">Olajumoke</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer margin={true} />
        </div>
    )
}

export default Corporate;