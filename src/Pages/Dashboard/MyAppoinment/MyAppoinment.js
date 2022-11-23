import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyAppoinment = () => {
    const { user } = useContext(AuthContext);

    const url = `https://doctors-portal-server-kappa-nine.vercel.app/bookings?email=${user?.email}`;

    // Display User specific Appointments using Data Table
    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }

    });
    console.log(bookings);

    // fetch(`https://doctors-portal-server-kappa-nine.vercel.app/bookings?email=${user?.email}`, {
    //     headers: {
    //         authorization: `bearer ${localStorage.getItem('accessToken')}`
    //     }
    // })
    //     .then(res => res.json())
    //     .then(data => console.log(data));


    return (
        <div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?.length && bookings.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.paitent}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.appoinmentDate}</td>
                                <td>{booking.slot}</td>
                                {
                                    booking.price && !booking.paid &&
                                    <Link to={`/dashboard/payment/${booking._id}`}>
                                        <button
                                            className='btn btn-primary btn-sm'
                                        >Pay</button>
                                    </Link>
                                }
                                {
                                    booking.price && booking.paid && <span className='text-green-500 font-bold btn-sm'>Paid</span>
                                }
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppoinment;