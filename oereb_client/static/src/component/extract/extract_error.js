import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideExtract, loadExtract, showExtract, showError } from '../../reducer/extract';
import { queryExtractById } from '../../api/extract';

function OerebExtractError(props) {
    const config = useSelector((state) => state.config).config;
    const extract = useSelector((state) => state.extract);
    const dispatch = useDispatch();

    const office1 = config.support.office1;
    
    function getOptionalAttribut(value) {
        if (value) {
            return (
                <span>
                    <br />{value}
                </span>
            );
        }
        return null;
    }

    function getPhone() {
        if (config.support.phone) {
            return (
                <span>
                    <br />
                    <i class="bi bi-telephone-fill" title="Telefon"></i> {config.support.phone}
                </span>
            );
        }
        return null;
    }

    function getMail() {
        if (config.support.email) {
            return (
                <span>
                    <br />
                    <i class="bi bi-envelope-fill" title="E-Mail"></i> <a ng-href="mailto:{config.support.email}">
                        {config.support.email}
                    </a>
                </span>
            );
        }
        return null;
    }

    const office2 = getOptionalAttribut(config.support.office2);
    const street = getOptionalAttribut(config.support.street);
    const city = getOptionalAttribut(config.support.city);
    const phone = getPhone();
    const email = getMail();

    const closeExtract = function() {
        dispatch(hideExtract());
    };

    const applicationUrl = config.application_url;

    console.log(extract);

    function retryExtract() {
        dispatch(loadExtract({
            egrid: extract.egrid
        }));
        queryExtractById(applicationUrl, extract.egrid)
        .then((data) => {
            dispatch(showExtract({
                extract: data
            }));
        })
        .catch((error) => {
            dispatch(showError());
        });
    }

    return (
        <div class="oereb-client-extract error container-fluid">
            <p class="text-end">
                <button onClick={closeExtract}
                        class="btn btn-outline-secondary"
                        type="button">
                    <i class="bi bi-x-lg"></i>
                </button>
            </p>
            <h3>
                <i class="bi bi-exclamation-circle-fill text-secondary"></i> Auszug fehlgeschlagen
            </h3>
            <p>
                Bei der Generierung des Auszugs ist ein Fehler aufgetreten.
                Bitte versuchen Sie, den Auszug erneut anzufordern.
            </p>
            <p class="text-center">
                <button onClick={retryExtract} class="btn btn-secondary">Erneut versuchen</button>
            </p>
            <p>
                Sollte der Fehler wiederholt auftreten,
                kontaktieren Sie bitte die katasterverantwortliche Stelle:
            </p>
            <p>
                <address>
                    <strong>{office1}</strong>
                    {office2}
                    {street}
                    {city}
                    {phone}
                    {email}
                </address>
            </p>
        </div>
    )
}

export default OerebExtractError;
