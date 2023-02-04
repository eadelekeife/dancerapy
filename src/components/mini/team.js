import React from "react";

import Footer from '../../utils/footer';
import Nav from "../../utils/nav";

const Team = () => {
    return (
        <div className="contact">
            <Nav />
            <div className="plan_bg">
                <h3>Meet the Team</h3>
            </div>
            <div className="mt-5 contain">
                <div className="grid_5">
                    <div className="">
                        <div className="team_img_cover team_card _1">
                            <div
                                className="site_bg_overlay">
                                <div>
                                    <p>
                                        Bimbo Obafunwa is the CEO of Corporate Dance World (Africa’s leading dance agency)
                                        Founder of The Dancerapy Club
                                        Director of The Dancedeal Training foundation (2009 till date)
                                        Winner of Celebrity Takes 2 season 1
                                        Dance director for Maltina Dance All (2007 – 2016)
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Bimbo Obafunwa David</h4>
                            <p className="team_member_role">Artistic Director / Administrator</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _2">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Olajumoke Sidiku Raliat</h4>
                            <p className="team_member_role">Executive Assistant</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _3">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Opemipo Ade Akingboye</h4>
                            <p className="team_member_role">Healthcare Consultant / Dancerapy Physician</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _4">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Michael Ayomikun Olanrewaju</h4>
                            <p className="team_member_role">Dancerapy Instructor</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _5">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Joseph Ogbor</h4>
                            <p className="team_member_role">Dancerapy Instructor</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _6">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Charles Ekwem</h4>
                            <p className="team_member_role">Dancerapy Instructor</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _7">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Anietienabasi Udoh</h4>
                            <p className="team_member_role">Dancerapy Instructor</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _8">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Jeremiah Balogun</h4>
                            <p className="team_member_role">Dancerapy Instructor</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _9">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Aniebet Emmanuel</h4>
                            <p className="team_member_role">Dancerapy Instructor</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _10">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Anozie Malachi</h4>
                            <p className="team_member_role">Dancerapy Instructor</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer margin={true} />
        </div>
    )
}

export default Team;