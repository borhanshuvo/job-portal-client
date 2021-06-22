import React, { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import Navbar from '../../Navbar/Navbar';
import './Home.css';

const Home = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [allJobPost, setAllJobPost] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const active = 'active';
    const history = useHistory();

    useEffect(() => {
        fetch('https://salty-oasis-92410.herokuapp.com/jobPostLists?status' + active)
            .then(res => res.json())
            .then(data => {
                setAllJobPost(data);
            });
    }, []);

    const postPerPage = 20;
    const pagesVisited = pageNumber * postPerPage;

    const displayPosts = allJobPost
        .slice(pagesVisited, pagesVisited + postPerPage)
        .map((post) => {
            return (
                <div className="col-md-12 pb-5">
                    <div className="card">
                        <div className="card-body text-center">
                            <h4 className="card-title">{post.companyName}</h4>
                            <p className="card-text">Company Email : {post.companyEmail}</p>
                            <p className="card-text">Job Description : {post.description}</p>
                            <p className="card-text">Vacancy : {post.vacancy}</p>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-primary" onClick={() => applyId(post._id)}>Apply Now</button>
                        </div>
                    </div>
                </div>
            );
        });

    const pageCount = Math.ceil(allJobPost.length / postPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const applyId = (id) => {
        const url = `dashboard/applyJob/${id}`;
        history.push(url);
    }

    return (
        <div>
            <Navbar />
            {loggedInUser.email &&
                <div className="container pt-5 mt-5">
                    <div className="row">
                        {displayPosts}
                        <div className="ps-5 ms-5">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeLinkClassName={"paginationActive"}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Home;