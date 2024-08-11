/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types'

Banner.propTypes = {
  color: PropTypes.string,
  errors: PropTypes.array,
  closeBanner: PropTypes.func
}

export default function Banner({ color, errors, closeBanner }) {
  return (
    <div className="fixed top-0 left-0 w-full">
      <div className={`flex justify-between max-md:flex-col ${color} gap-6 text-white px-6 py-3.5 rounded font-[sans-serif]`}>
        <div className="flex flex-col">
          { errors.map((e, index) => {
              return (
                <>
                  <p key={index} className="text-base flex-1 max-md:text-center">{e}</p>
                </>
              )
            })
          }
        </div>

        <div>
          <button onClick={closeBanner}>
            <svg xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 cursor-pointer fill-white inline-block ml-4" viewBox="0 0 320.591 320.591">
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000" />
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000" />
            </svg>

          </button>
        </div>
      </div>
    </div>
  )
}