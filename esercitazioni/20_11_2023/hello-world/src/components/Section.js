export default function Section({children, additionalText}) {

    return(
        <section className="column">
            {children
                ? <>
                    {children}
                    <p>{additionalText}</p>
                  </>
                : null
            }
        </section>
    )
}