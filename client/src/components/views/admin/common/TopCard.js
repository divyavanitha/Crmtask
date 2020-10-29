import React, { PropsWithChildren, ReactElement } from "react";

function TopCard(props) {
    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className={`card border-left-${props.class} h-100`}>
                <div className="card-header">
                    <h5 className="">{props.title}</h5>
                </div>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{props.text}</div>
                        </div>
                        <div className="col-auto">
                            <i className={`fa fa-${props.icon} fa-2x text-gray-300`}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TopCard;
