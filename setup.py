from setuptools import setup

def readme():
    with open("README.md") as f:
        return f.read()

setup(
    name="fireflies",
    version="5.0.0",
    packages=[
        "fireflies",
        "fireflies.migrations"
    ],
    description="A small application that displays a quote and image at random.",
    long_description=readme(),
    url="https://github.com/voxeldavid/fireflies",
    author="David Minnerly",
    license="MIT",
    keywords="fireflies background image quote web app django",
    include_package_data=True,
    classifiers=[
        "Development Status :: 4 - Beta",
        "Environment :: Web Environment",
        "Framework :: Django",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3.0",
        "Programming Language :: Python :: 3.1",
        "Programming Language :: Python :: 3.2",
        "Programming Language :: Python :: 3.3",
        "Programming Language :: Python :: 3.4",
    ]
)
